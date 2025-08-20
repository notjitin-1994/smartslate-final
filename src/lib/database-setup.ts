import { getSupabaseService } from './supabase';

export async function setupDatabase() {
  const supabase = getSupabaseService();
  
  console.log('Setting up database tables...');
  
  // Try to create tables using direct SQL
  const createTablesSQL = `
    -- Create case_study_requests table
    CREATE TABLE IF NOT EXISTS case_study_requests (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT NOT NULL,
      role TEXT,
      industry TEXT,
      case_study_type TEXT NOT NULL,
      specific_interests TEXT[] DEFAULT '{}',
      current_challenges TEXT,
      follow_up TEXT,
      ip_address INET,
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create consultation_requests table
    CREATE TABLE IF NOT EXISTS consultation_requests (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT NOT NULL,
      role TEXT,
      department TEXT,
      industry TEXT,
      company_size TEXT,
      location TEXT,
      consultation_type TEXT NOT NULL,
      preferred_date DATE NOT NULL,
      preferred_time TEXT NOT NULL,
      timezone TEXT,
      consultation_duration TEXT DEFAULT '60 minutes',
      attendees_count INTEGER,
      attendee_roles TEXT[] DEFAULT '{}',
      urgency_level TEXT DEFAULT 'normal',
      primary_challenge TEXT NOT NULL,
      secondary_challenges TEXT[] DEFAULT '{}',
      team_size TEXT,
      budget_range TEXT,
      timeline TEXT,
      decision_makers TEXT,
      implementation_scope TEXT,
      service_interest TEXT[] DEFAULT '{}',
      specific_requirements TEXT[] DEFAULT '{}',
      use_case TEXT,
      integration_needs TEXT[] DEFAULT '{}',
      compliance_needs TEXT[] DEFAULT '{}',
      current_lms TEXT,
      current_tools TEXT[] DEFAULT '{}',
      learning_goals TEXT,
      success_metrics TEXT,
      pain_points TEXT,
      desired_outcomes TEXT,
      how_did_you_hear TEXT,
      competitive_analysis TEXT,
      additional_notes TEXT,
      referral_source TEXT,
      ip_address INET,
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create demo_requests table
    CREATE TABLE IF NOT EXISTS demo_requests (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT NOT NULL,
      role TEXT,
      department TEXT,
      industry TEXT,
      company_size TEXT,
      location TEXT,
      demo_type TEXT NOT NULL,
      preferred_date DATE NOT NULL,
      preferred_time TEXT NOT NULL,
      timezone TEXT,
      attendees_count INTEGER,
      attendee_roles TEXT[] DEFAULT '{}',
      primary_interest TEXT NOT NULL,
      secondary_interests TEXT[] DEFAULT '{}',
      current_challenges TEXT,
      team_size TEXT,
      budget_range TEXT,
      timeline TEXT,
      decision_makers TEXT,
      implementation_scope TEXT,
      current_lms TEXT,
      current_tools TEXT[] DEFAULT '{}',
      learning_goals TEXT,
      success_metrics TEXT,
      pain_points TEXT,
      desired_outcomes TEXT,
      how_did_you_hear TEXT,
      additional_notes TEXT,
      ip_address INET,
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create solara_interest_modal table
    CREATE TABLE IF NOT EXISTS solara_interest_modal (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT NOT NULL,
      role TEXT,
      department TEXT,
      company_size TEXT,
      industry TEXT,
      location TEXT,
      current_lms TEXT,
      current_tools TEXT[] DEFAULT '{}',
      learning_challenges TEXT,
      content_creation_process TEXT,
      learner_count TEXT,
      content_volume TEXT,
      primary_use_case TEXT NOT NULL,
      solara_components TEXT[] DEFAULT '{}',
      specific_features TEXT[] DEFAULT '{}',
      integration_needs TEXT[] DEFAULT '{}',
      ai_requirements TEXT[] DEFAULT '{}',
      timeline TEXT,
      budget_range TEXT,
      team_size TEXT,
      decision_makers TEXT,
      implementation_scope TEXT,
      current_pain_points TEXT,
      success_metrics TEXT,
      competitive_analysis TEXT,
      how_did_you_hear TEXT,
      additional_notes TEXT,
      privacy_consent BOOLEAN DEFAULT FALSE,
      ip_address INET,
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create ssa_interest_modal table
    CREATE TABLE IF NOT EXISTS ssa_interest_modal (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT NOT NULL,
      role TEXT,
      department TEXT,
      company_size TEXT,
      industry TEXT,
      location TEXT,
      current_challenges TEXT,
      skill_gaps TEXT[] DEFAULT '{}',
      existing_lms TEXT,
      current_training_budget TEXT,
      employee_count TEXT,
      target_audience TEXT,
      primary_goals TEXT[] DEFAULT '{}',
      timeline TEXT,
      budget TEXT,
      specific_outcomes TEXT,
      implementation_scope TEXT,
      decision_makers TEXT,
      current_pain_points TEXT,
      success_metrics TEXT,
      competitive_analysis TEXT,
      how_did_you_hear TEXT,
      additional_notes TEXT,
      privacy_consent BOOLEAN DEFAULT FALSE,
      ip_address INET,
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create partner_inquiries table
    CREATE TABLE IF NOT EXISTS partner_inquiries (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT NOT NULL,
      role TEXT,
      industry TEXT,
      partnership_type TEXT NOT NULL,
      company_description TEXT,
      target_market TEXT,
      current_offerings TEXT,
      partnership_goals TEXT,
      expected_timeline TEXT,
      additional_notes TEXT,
      ip_address INET,
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create waitlist_leads table
    CREATE TABLE IF NOT EXISTS waitlist_leads (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      role TEXT,
      industry TEXT,
      company_size TEXT,
      location TEXT,
      primary_interest TEXT NOT NULL,
      secondary_interests TEXT[] DEFAULT '{}',
      current_challenges TEXT,
      team_size TEXT,
      timeline TEXT,
      how_did_you_hear TEXT,
      additional_notes TEXT,
      ip_address INET,
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  try {
    // Try to execute the SQL directly
    const { error } = await supabase.rpc('exec_sql', { sql: createTablesSQL });
    
    if (error) {
      console.log('RPC exec_sql failed, trying alternative approach...');
      
      // Try to create tables one by one by attempting inserts
      const tables = [
        'case_study_requests',
        'consultation_requests', 
        'demo_requests',
        'solara_interest_modal',
        'ssa_interest_modal',
        'partner_inquiries',
        'waitlist_leads'
      ];
      
      for (const tableName of tables) {
        try {
          // Try to insert a test record to see if table exists
          const { error: testError } = await supabase
            .from(tableName)
            .insert({
              name: 'TEST',
              email: 'test@test.com',
              company: 'TEST',
              case_study_type: 'test',
              consultation_type: 'test',
              demo_type: 'test',
              primary_use_case: 'test',
              partnership_type: 'test',
              primary_interest: 'test'
            })
            .select('id')
            .limit(1);
          
          if (testError && testError.code === '42P01') {
            console.log(`Table ${tableName} does not exist - you may need to create it manually in Supabase`);
          } else if (testError) {
            console.log(`Table ${tableName} exists but has validation errors:`, testError.message);
          } else {
            console.log(`Table ${tableName} exists and is working`);
            // Delete the test record
            await supabase.from(tableName).delete().eq('email', 'test@test.com');
          }
        } catch (err) {
          console.log(`Error testing table ${tableName}:`, err);
        }
      }
    } else {
      console.log('Database tables created successfully');
    }
  } catch (error) {
    console.error('Database setup error:', error);
  }
  
  console.log('Database setup complete');
}
