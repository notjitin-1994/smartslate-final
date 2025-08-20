import { NextRequest, NextResponse } from 'next/server';
import { setupDatabase } from '@/lib/database-setup';

export async function POST(req: NextRequest) {
  try {
    // Only allow in development or with a secret key
    if (process.env.NODE_ENV === 'production') {
      const authHeader = req.headers.get('authorization');
      if (authHeader !== `Bearer ${process.env.SETUP_SECRET_KEY}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    await setupDatabase();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully' 
    });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json(
      { error: 'Failed to setup database' },
      { status: 500 }
    );
  }
}
