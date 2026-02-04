import { NextResponse } from 'next/server';
import { getSupabase } from '../../../../lib/supabase';
import type { Database } from '../../../../types/database';
import type { User } from '../../../../types/database';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = getSupabase();
  
  // Get admin user
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', 'anthonyhasrouny8@gmail.com')
    .maybeSingle();

  if (userError || !userData) {
    return NextResponse.json({ error: 'User not found', userError });
  }

  const user = userData as User;
  
  if (!user.id) {
    return NextResponse.json({ error: 'User missing id' });
  }

  // Check if project already exists
  const { data: existingProject } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (existingProject) {
    return NextResponse.json({ message: 'Project already exists', project: existingProject });
  }

  // Create a test project
  const newProject: Database['public']['Tables']['projects']['Insert'] = {
    user_id: user.id,
    name: 'My Website Project',
    status: 'active',
    current_stage: 3,
  };

  // Type assertion needed due to Supabase type inference issue
  const { data: projectData, error: projectError } = await (supabase
    .from('projects') as unknown as {
      insert: (data: Database['public']['Tables']['projects']['Insert']) => {
        select: () => { single: () => Promise<{ data: unknown; error: { message?: string; code?: string } | null }> };
      };
    })
    .insert(newProject)
    .select()
    .single();

  if (projectError || !projectData) {
    return NextResponse.json({ error: 'Failed to create project', projectError });
  }

  const project = projectData as Database['public']['Tables']['projects']['Row'];

  // Create intake form
  const newIntake: Database['public']['Tables']['intake_forms']['Insert'] = {
    project_id: project.id as string,
    data: { businessName: 'Test Business' },
    locked: false,
    submitted_at: null,
  };

  const { error: intakeError } = await (supabase
    .from('intake_forms') as unknown as {
      insert: (data: Database['public']['Tables']['intake_forms']['Insert']) => Promise<{ error: { message?: string } | null }>;
    })
    .insert(newIntake);

  // Create a project note
  const newNote: Database['public']['Tables']['project_notes']['Insert'] = {
    project_id: project.id as string,
    content: 'Project started! Working on the homepage design.',
  };

  const { error: noteError } = await (supabase
    .from('project_notes') as unknown as {
      insert: (data: Database['public']['Tables']['project_notes']['Insert']) => Promise<{ error: { message?: string } | null }>;
    })
    .insert(newNote);

  // Create an invoice
  const newInvoice: Database['public']['Tables']['invoices']['Insert'] = {
    project_id: project.id as string,
    amount: 150.00,
    status: 'unpaid',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    paid_at: null,
  };

  const { error: invoiceError } = await (supabase
    .from('invoices') as unknown as {
      insert: (data: Database['public']['Tables']['invoices']['Insert']) => Promise<{ error: { message?: string } | null }>;
    })
    .insert(newInvoice);

  return NextResponse.json({
    success: true,
    user,
    project,
    errors: {
      intake: intakeError?.message,
      note: noteError?.message,
      invoice: invoiceError?.message,
    },
  });
}

