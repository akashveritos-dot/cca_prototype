/**
 * API Route: Forms
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const forms = await query('SELECT * FROM forms WHERE status = ? ORDER BY created_at DESC', ['active']);
    return NextResponse.json({ success: true, data: forms });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, submit_button_text, success_message, error_message, redirect_url, 
            email_notification, notification_emails, status, created_by } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required' }, { status: 400 });
    }

    const result = await query<any>(
      `INSERT INTO forms (name, slug, description, submit_button_text, success_message, error_message, 
       redirect_url, email_notification, notification_emails, status, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, description || null, submit_button_text || 'Submit', success_message || null, 
       error_message || null, redirect_url || null, email_notification !== false, notification_emails || null, 
       status || 'active', created_by || null]
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
