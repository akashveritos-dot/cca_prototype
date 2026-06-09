/**
 * API Route: Health Check
 * GET /api/health - Check if API and database are working
 */

import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    
    return NextResponse.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error.message
      },
      { status: 500 }
    );
  }
}
