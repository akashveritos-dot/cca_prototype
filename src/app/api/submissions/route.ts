/**
 * API Route: Form Submissions
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get('form_id');
    const status = searchParams.get('status');
    
    let sql = 'SELECT * FROM form_submissions ORDER BY created_at DESC';
    let params: any[] = [];
    
    if (formId && status) {
      sql = 'SELECT * FROM form_submissions WHERE form_id = ? AND status = ? ORDER BY created_at DESC';
      params = [formId, status];
    } else if (formId) {
      sql = 'SELECT * FROM form_submissions WHERE form_id = ? ORDER BY created_at DESC';
      params = [formId];
    } else if (status) {
      sql = 'SELECT * FROM form_submissions WHERE status = ? ORDER BY created_at DESC';
      params = [status];
    }
    
    const submissions = await query(sql, params);
    return NextResponse.json({ success: true, data: submissions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { form_id, data, ip_address, user_agent } = body;

    if (!form_id || !data) {
      return NextResponse.json({ success: false, error: 'Form ID and data are required' }, { status: 400 });
    }

    const result = await query<any>(
      'INSERT INTO form_submissions (form_id, data, ip_address, user_agent, status) VALUES (?, ?, ?, ?, ?)',
      [form_id, JSON.stringify(data), ip_address || null, user_agent || null, 'unread']
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
