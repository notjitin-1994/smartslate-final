#!/usr/bin/env tsx

import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { getDb } from '../src/lib/db';

// Load environment variables from .env file
config({ path: join(__dirname, '..', '.env') });

async function migrateSSATable() {
  try {
    console.log('🔄 Starting SSA table migration...');
    
    // Read the SQL file
    const sqlPath = join(__dirname, 'create_ssa_interest_modal.sql');
    const sqlContent = readFileSync(sqlPath, 'utf8');
    
    console.log('📄 SQL file loaded successfully');
    
    // Execute the migration
    const db = getDb();
    
    try {
      await db.query(sqlContent);
      console.log('✅ SSA table migration completed successfully!');
    } catch (error: any) {
      if (error.code === '42710') {
        console.log('ℹ️  Table or constraints already exist - migration skipped');
        console.log('✅ SSA table is ready to use');
      } else {
        throw error;
      }
    }
    console.log('📊 Table: app.ssa_interest_modal');
    console.log('🔗 Ready to receive SSA interest submissions');
    
    // Verify the table was created
    const result = await db.query(`
      SELECT table_name, column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_schema = 'app' 
      AND table_name = 'ssa_interest_modal'
      ORDER BY ordinal_position;
    `);
    
    console.log('\n📋 Table structure:');
    result.rows.forEach((row: any) => {
      console.log(`  ${row.column_name}: ${row.data_type} ${row.is_nullable === 'NO' ? '(NOT NULL)' : '(nullable)'}`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run the migration
migrateSSATable();
