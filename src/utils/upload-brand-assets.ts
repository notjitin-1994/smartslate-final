import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadFile(filePath: string, bucketName: string) {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  console.log(`Uploading ${fileName} to ${bucketName}...`);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, {
      contentType: 'image/png',
      upsert: true
    });

  if (error) {
    console.error(`Error uploading ${fileName}:`, error.message);
  } else {
    console.log(`Successfully uploaded ${fileName}:`, data.path);
  }
}

async function main() {
  const assets = [
    path.resolve(process.cwd(), 'public/logo.png'),
    path.resolve(process.cwd(), 'public/logo-swirl.png')
  ];

  for (const asset of assets) {
    if (fs.existsSync(asset)) {
      await uploadFile(asset, 'brand-assets');
    } else {
      console.warn(`File not found: ${asset}`);
    }
  }
}

main().catch(console.error);
