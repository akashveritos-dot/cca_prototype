/**
 * API Route: Single Testimonial
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    await query(
      'UPDATE testimonials SET name = ?, position = ?, company = ?, content = ?, avatar_id = ?, rating = ?, sort_order = ?, status = ? WHERE id = ?',
      [body.name, body.position, body.company, body.content, body.avatar_id, body.rating, body.sort_order, body.status, params.id]
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await query('DELETE FROM testimonials WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
