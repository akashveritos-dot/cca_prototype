/**
 * API Route: Single FAQ
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const faq = await query('SELECT * FROM faqs WHERE id = ? LIMIT 1', [id]);
    if (!faq || faq.length === 0) {
      return NextResponse.json({ success: false, error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: faq[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await query(
      'UPDATE faqs SET question = ?, answer = ?, category = ?, sort_order = ?, status = ? WHERE id = ?',
      [body.question, body.answer, body.category, body.sort_order, body.status, id]
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await query('DELETE FROM faqs WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
