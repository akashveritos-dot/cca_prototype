/**
 * API Route: Single Video
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await query(
      'UPDATE videos SET title = ?, description = ?, video_url = ?, video_type = ?, thumbnail_id = ?, category = ?, tags = ?, sort_order = ?, status = ? WHERE id = ?',
      [body.title, body.description, body.video_url, body.video_type, body.thumbnail_id, body.category, 
       body.tags ? JSON.stringify(body.tags) : null, body.sort_order, body.status, id]
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await query('DELETE FROM videos WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
