#!/usr/bin/env tsx

import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { getDb } from '../src/lib/db';

config({ path: join(__dirname, '..', '.env') });

async function migrate() {
  try {
    console.log('🔄 Creating app.user_profiles table...');
    const sqlPath = join(__dirname, 'create_user_profiles.sql');
    const sql = readFileSync(sqlPath, 'utf8');
    const db = getDb();
    await db.query(sql);
    console.log('✅ user_profiles table is ready');
  } catch (e) {
    console.error('❌ Migration failed:', e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

migrate();


