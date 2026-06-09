/**
 * API Route: Single Submission
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const submission = await query('SELECT * FROM form_submissions WHERE id = ? LIMIT 1', [id]);
    
    if (!submission || submission.length === 0) {
      return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: submission[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await query(
      'UPDATE form_submissions SET status = ?, notes = ? WHERE id = ?',
      [body.status, body.notes, id]
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await query('DELETE FROM form_submissions WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
