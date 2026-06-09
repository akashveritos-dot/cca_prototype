/**
 * API Route: Single Gallery
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const gallery = await query('SELECT * FROM galleries WHERE id = ? LIMIT 1', [id]);
    const items = await query('SELECT * FROM gallery_items WHERE gallery_id = ? ORDER BY sort_order ASC', [id]);
    
    if (!gallery || gallery.length === 0) {
      return NextResponse.json({ success: false, error: 'Gallery not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: { gallery: gallery[0], items } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await query(
      'UPDATE galleries SET title = ?, description = ?, slug = ?, category = ?, status = ? WHERE id = ?',
      [body.title, body.description, body.slug, body.category, body.status, id]
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await query('DELETE FROM galleries WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
