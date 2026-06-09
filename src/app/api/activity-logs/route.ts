/**
 * API Route: Activity Logs
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const action = searchParams.get('action');
    const limit = parseInt(searchParams.get('limit') || '100');

    let sql = `SELECT al.*, u.email, u.first_name, u.last_name 
               FROM activity_logs al 
               LEFT JOIN users u ON al.user_id = u.id 
               WHERE 1=1`;
    let params: any[] = [];

    if (userId) {
      sql += ' AND al.user_id = ?';
      params.push(userId);
    }

    if (action) {
      sql += ' AND al.action = ?';
      params.push(action);
    }

    sql += ' ORDER BY al.created_at DESC LIMIT ?';
    params.push(limit);

    const logs = await query(sql, params);
    return NextResponse.json({ success: true, data: logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, action, entity_type, entity_id, description, ip_address, user_agent, metadata } = body;

    await query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id, description, ip_address, user_agent, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id || null, action, entity_type || null, entity_id || null, description || null, 
       ip_address || null, user_agent || null, metadata ? JSON.stringify(metadata) : null]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
