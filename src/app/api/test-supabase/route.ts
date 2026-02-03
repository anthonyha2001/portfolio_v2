import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET() {
  const results = {
    connectionTest: {
      success: false,
      message: '',
      data: null as unknown,
      error: null as unknown,
    },
    insertTest: {
      success: false,
      message: '',
      data: null as unknown,
      error: null as unknown,
    },
  };

  // Test 1: Select from users table
  try {
    console.log('Testing Supabase connection - selecting from users table...');
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, role')
      .limit(5);

    if (error) {
      results.connectionTest.success = false;
      results.connectionTest.message = 'Error selecting from users table';
      results.connectionTest.error = {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      };
      console.error('Supabase select error:', error);
    } else {
      results.connectionTest.success = true;
      results.connectionTest.message = 'Successfully connected to Supabase and queried users table';
      results.connectionTest.data = data;
      console.log('Supabase select success:', data);
    }
  } catch (error) {
    results.connectionTest.success = false;
    results.connectionTest.message = 'Unexpected error during connection test';
    results.connectionTest.error = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
    } : error;
    console.error('Unexpected error:', error);
  }

  // Test 2: Insert test user
  try {
    console.log('Testing Supabase insert - creating test user...');
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: 'test@test.com',
        name: 'Test User',
        role: 'client',
        google_id: null,
      })
      .select()
      .single();

    if (error) {
      results.insertTest.success = false;
      results.insertTest.message = 'Error inserting test user';
      results.insertTest.error = {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      };
      console.error('Supabase insert error:', error);
      
      // Check if error is due to duplicate (user already exists)
      if (error.code === '23505' || error.message.includes('duplicate') || error.message.includes('unique')) {
        results.insertTest.message = 'Test user already exists (this is expected if endpoint was called before)';
      }
    } else {
      results.insertTest.success = true;
      results.insertTest.message = 'Successfully inserted test user';
      results.insertTest.data = data;
      console.log('Supabase insert success:', data);
    }
  } catch (error) {
    results.insertTest.success = false;
    results.insertTest.message = 'Unexpected error during insert test';
    results.insertTest.error = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
    } : error;
    console.error('Unexpected error:', error);
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    tests: results,
    summary: {
      connectionTestPassed: results.connectionTest.success,
      insertTestPassed: results.insertTest.success,
      allTestsPassed: results.connectionTest.success && results.insertTest.success,
    },
  });
}

