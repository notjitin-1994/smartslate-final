#!/usr/bin/env tsx

import { config } from 'dotenv';
import { join } from 'path';
import { getSupabaseService } from '../src/lib/supabase';
import { getDb } from '../src/lib/db';

config({ path: join(__dirname, '..', '.env') });

async function backfill() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is required to backfill users.');
    process.exit(1);
  }
  try {
    console.log('🔄 Backfilling app.user_profiles from Supabase auth users...');
    const admin = getSupabaseService();
    const db = getDb();

    let page = 1;
    const perPage = 100;
    let totalInserted = 0;
    // Supabase Admin API list users: paginated via page/per_page
    while (true) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
      if (error) throw error;
      const users = data?.users || [];
      if (users.length === 0) break;

      for (const u of users) {
        const id = u.id;
        const email = u.email || null;
        const fullName = (u.user_metadata?.full_name as string) || (email ? email.split('@')[0] : null);
        await db.query(
          `INSERT INTO app.user_profiles (user_id, full_name)
           VALUES ($1, $2)
           ON CONFLICT (user_id) DO NOTHING`,
          [id, fullName]
        );
        totalInserted += 1;
      }

      console.log(`Processed page ${page}, users: ${users.length}`);
      page += 1;
    }
    console.log(`✅ Backfill complete. Processed ${totalInserted} users.`);
  } catch (e) {
    console.error('❌ Backfill failed:', e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

backfill();


