/**
 * API Route: Single Form
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const form = await query('SELECT * FROM forms WHERE id = ? LIMIT 1', [params.id]);
    const fields = await query('SELECT * FROM form_fields WHERE form_id = ? ORDER BY sort_order ASC', [params.id]);
    
    if (!form || form.length === 0) {
      return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: { form: form[0], fields } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    await query(
      `UPDATE forms SET name = ?, slug = ?, description = ?, submit_button_text = ?, 
       success_message = ?, error_message = ?, redirect_url = ?, email_notification = ?, 
       notification_emails = ?, status = ? WHERE id = ?`,
      [body.name, body.slug, body.description, body.submit_button_text, body.success_message, 
       body.error_message, body.redirect_url, body.email_notification, body.notification_emails, 
       body.status, params.id]
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await query('DELETE FROM forms WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
