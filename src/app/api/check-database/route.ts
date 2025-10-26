import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseService();
    
    // Check if we can connect to Supabase
    const { data: connectionTest, error: connectionError } = await supabase
      .from('_dummy_table_')
      .select('*')
      .limit(1);
    
    if (connectionError && connectionError.code === '42P01') {
      // Connection works, table doesn't exist (expected)
      console.log('Supabase connection successful');
    } else if (connectionError) {
      console.error('Supabase connection error:', connectionError);
      return NextResponse.json({
        status: 'error',
        message: 'Failed to connect to Supabase',
        error: connectionError.message
      }, { status: 500 });
    }
    
    // Check if required tables exist
    const tables = ['ssa_interest_modal', 'solara_interest_modal'];
    const tableStatus: Record<string, 'missing' | 'error' | 'exists'> = {};
    
    for (const tableName of tables) {
      try {
        const { error: tableError } = await supabase
          .from(tableName)
          .select('id')
          .limit(1);
        
        if (tableError && tableError.code === '42P01') {
          tableStatus[tableName] = 'missing';
        } else if (tableError) {
          tableStatus[tableName] = 'error';
          console.error(`Error checking table ${tableName}:`, tableError);
        } else {
          tableStatus[tableName] = 'exists';
        }
      } catch (err) {
        tableStatus[tableName] = 'error';
        console.error(`Exception checking table ${tableName}:`, err);
      }
    }
    
    const missingTables = Object.entries(tableStatus)
      .filter(([_, status]) => status === 'missing')
      .map(([tableName]) => tableName);
    
    if (missingTables.length > 0) {
      return NextResponse.json({
        status: 'setup_required',
        message: 'Database tables are missing. Please run the setup script.',
        connection: 'working',
        tables: tableStatus,
        missingTables,
        setupInstructions: [
          '1. Go to your Supabase dashboard',
          '2. Navigate to the SQL Editor',
          '3. Copy and paste the contents of database-schema.sql',
          '4. Run the SQL script',
          '5. Refresh this endpoint to verify setup'
        ]
      }, { status: 200 });
    }
    
    return NextResponse.json({
      status: 'ready',
      message: 'Database is properly configured',
      connection: 'working',
      tables: tableStatus
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database check error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to check database status',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
