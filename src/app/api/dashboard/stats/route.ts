/**
 * API Route: Dashboard Statistics
 * GET /api/dashboard/stats - Get dashboard statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
