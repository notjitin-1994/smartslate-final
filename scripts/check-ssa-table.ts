#!/usr/bin/env tsx

import { config } from 'dotenv';
import { join } from 'path';
import { getDb } from '../src/lib/db';

// Load environment variables from .env file
config({ path: join(__dirname, '..', '.env') });

async function checkSSATable() {
  try {
    console.log('🔍 Checking SSA table status...');
    
    const db = getDb();
    
    // Check if table exists
    const tableExists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'app' 
        AND table_name = 'ssa_interest_modal'
      );
    `);
    
    if (tableExists.rows[0]?.exists) {
      console.log('✅ Table app.ssa_interest_modal exists');
      
      // Get table structure
      const structure = await db.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_schema = 'app' 
        AND table_name = 'ssa_interest_modal'
        ORDER BY ordinal_position;
      `);
      
      console.log('\n📋 Current table structure:');
      structure.rows.forEach((row: any) => {
        console.log(`  ${row.column_name}: ${row.data_type} ${row.is_nullable === 'NO' ? '(NOT NULL)' : '(nullable)'} ${row.column_default ? `[default: ${row.column_default}]` : ''}`);
      });
      
      // Check row count
      const count = await db.query(`
        SELECT COUNT(*) as count FROM app.ssa_interest_modal;
      `);
      
      console.log(`\n📊 Total rows: ${count.rows[0]?.count}`);
      
    } else {
      console.log('❌ Table app.ssa_interest_modal does not exist');
    }
    
  } catch (error) {
    console.error('❌ Error checking table:', error);
  } finally {
    process.exit(0);
  }
}

checkSSATable();
