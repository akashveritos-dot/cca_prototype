/**
 * API Route: Galleries
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const galleries = await query('SELECT * FROM galleries WHERE status = ? ORDER BY created_at DESC', ['active']);
    return NextResponse.json({ success: true, data: galleries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, slug, category, status, created_by } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, error: 'Title and slug are required' }, { status: 400 });
    }

    const result = await query<any>(
      'INSERT INTO galleries (title, description, slug, category, status, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description || null, slug, category || null, status || 'active', created_by || null]
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
