import { NextResponse } from 'next/server'
import { getSupabase } from '../../../../lib/supabase'
import type { Database } from '../../../../types/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
    },
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch (error) {
    return NextResponse.json({
      ...results,
      error: 'Supabase not configured',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 200 });
  }

  // Test 1: Basic connection
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    results.connectionTest = {
      success: !error,
      error: error?.message || null,
      data,
    }
  } catch (err) {
    results.connectionTest = {
      success: false,
      error: String(err),
    }
  }

  // Test 2: Try to insert a test user
  try {
    const testEmail = `test-${Date.now()}@example.com`
    
    const newUser: Database['public']['Tables']['users']['Insert'] = {
      email: testEmail,
      name: 'Test User',
      role: 'client',
      google_id: null,
    }
    
    // Type assertion needed due to Supabase type inference issue
    const { data, error } = await (supabase
      .from('users') as unknown as {
        insert: (data: Database['public']['Tables']['users']['Insert']) => {
          select: () => Promise<{ data: unknown; error: { message?: string; code?: string; details?: string } | null }>;
        };
      })
      .insert(newUser)
      .select()
    
    results.insertTest = {
      success: !error,
      error: error?.message || null,
      errorCode: error?.code || null,
      errorDetails: error?.details || null,
      data,
    }

    // Clean up test user if insert succeeded
    if (!error) {
      await supabase.from('users').delete().eq('email', testEmail)
      ;(results.insertTest as Record<string, unknown>).cleaned = true
    }
  } catch (err) {
    results.insertTest = {
      success: false,
      error: String(err),
    }
  }

  // Test 3: List all users
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
    
    results.selectTest = {
      success: !error,
      error: error?.message || null,
      userCount: data?.length || 0,
      users: data,
    }
  } catch (err) {
    results.selectTest = {
      success: false,
      error: String(err),
    }
  }

  return NextResponse.json(results, { status: 200 })
}
