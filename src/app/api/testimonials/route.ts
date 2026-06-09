/**
 * API Route: Testimonials
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const testimonials = await query('SELECT * FROM testimonials WHERE status = ? ORDER BY sort_order ASC', ['active']);
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, company, content, avatar_id, rating, sort_order, status, created_by } = body;

    if (!name || !content) {
      return NextResponse.json({ success: false, error: 'Name and content are required' }, { status: 400 });
    }

    const result = await query<any>(
      'INSERT INTO testimonials (name, position, company, content, avatar_id, rating, sort_order, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, position || null, company || null, content, avatar_id || null, rating || 5, sort_order || 0, status || 'active', created_by || null]
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
