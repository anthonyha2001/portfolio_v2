import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getSupabase } from '../../../../../lib/supabase';
import { sendIntakeEmail } from '../../../../../lib/email';
import type { Database } from '../../../../../types/database';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.json();

    const supabase = getSupabase();

    // Get user from Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      console.error('User lookup error:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const typedUser = user as { id: string };

    // Check if user has a project, if not create one
    const { data: existingProject, error: projectLookupError } = await supabase
      .from('projects')
      .select('id')
      .eq('user_id', typedUser.id)
      .single();

    if (projectLookupError && projectLookupError.code !== 'PGRST116') {
      // PGRST116 = row not found
      console.error('Project lookup error:', projectLookupError);
    }

    type ProjectInsert = Database['public']['Tables']['projects']['Insert'];

    let project = existingProject as { id: string } | null;

    if (!project) {
      const insertPayload: ProjectInsert = {
        user_id: typedUser.id,
        name: formData.businessName || 'New Project',
        status: 'active',
        current_stage: 1,
      };

      const {
        data: newProject,
        error: projectError,
      } = await (supabase.from('projects') as unknown as {
        insert: (
          values: ProjectInsert,
        ) => Promise<{
          data: { id: string } | null;
          error: { message?: string; code?: string; details?: string } | null;
        }>;
      }).insert(insertPayload);

      if (projectError || !newProject) {
        console.error('Failed to create project:', projectError);
        return NextResponse.json(
          { error: 'Failed to create project' },
          { status: 500 },
        );
      }

      project = newProject;
    }

    // Save or update intake form
    const { data: existingIntake } = await supabase
      .from('intake_forms')
      .select('id')
      .eq('project_id', project.id)
      .single();

    if (existingIntake) {
      const typedExistingIntake = existingIntake as { id: string };

      await (supabase.from('intake_forms') as unknown as {
        update: (values: {
          data: unknown;
          submitted_at: string;
          locked: boolean;
        }) => {
          eq: (column: string, value: string) => Promise<unknown>;
        };
      })
        .update({
          data: formData,
          submitted_at: new Date().toISOString(),
          locked: true,
        })
        .eq('id', typedExistingIntake.id);
    } else {
      await (supabase.from('intake_forms') as unknown as {
        insert: (values: {
          project_id: string;
          data: unknown;
          submitted_at: string;
          locked: boolean;
        }) => Promise<unknown>;
      }).insert({
        project_id: project.id,
        data: formData,
        submitted_at: new Date().toISOString(),
        locked: true,
      });
    }

    // Update project stage to "Intake Received"
    const finalProject = project as { id: string };

    await (supabase.from('projects') as unknown as {
      update: (values: { current_stage: number; name: string }) => {
        eq: (column: string, value: string) => Promise<unknown>;
      };
    })
      .update({
        current_stage: 1,
        name: formData.businessName || 'New Project',
      })
      .eq('id', finalProject.id);

    // Send email notification (do not fail request if this throws)
    try {
      await sendIntakeEmail({
        ...formData,
        userEmail: session.user.email,
        userName: session.user.name || undefined,
      });
      console.log('Intake email sent successfully');
    } catch (emailError) {
      console.error('Failed to send intake email:', emailError);
    }

    return NextResponse.json({ success: true, projectId: project.id });
  } catch (error) {
    console.error('Intake submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}


