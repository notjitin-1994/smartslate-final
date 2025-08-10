export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withPermission } from '@/middleware/rbac';
import prisma from '@/lib/prisma';

// Execute SQL query (requires database:manage permission)
export const POST = withPermission('database:manage', async (req: NextRequest) => {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Safety checks - only allow SELECT queries for now
    const trimmedQuery = query.trim().toLowerCase();
    const allowedCommands = ['select'];
    const commandUsed = trimmedQuery.split(' ')[0];

    if (!allowedCommands.includes(commandUsed)) {
      return NextResponse.json({ 
        error: 'Only SELECT queries are allowed for safety. Use the operations panel for modifications.' 
      }, { status: 400 });
    }

    // Execute query using Prisma's raw query
    try {
      const result = await prisma.$queryRawUnsafe(query);
      
      return NextResponse.json({ 
        ok: true, 
        result,
        rowCount: Array.isArray(result) ? result.length : 0,
        message: 'Query executed successfully'
      });
    } catch (queryError: any) {
      return NextResponse.json({ 
        error: `Query execution failed: ${queryError.message}`,
        details: queryError.meta || {}
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to execute query:', error);
    return NextResponse.json({ error: 'Failed to execute query' }, { status: 500 });
  }
});
