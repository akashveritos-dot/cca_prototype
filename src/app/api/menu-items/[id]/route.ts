/**
 * API Route: Single Menu Item
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    await query(
      `UPDATE menu_items SET label = ?, url = ?, page_id = ?, target = ?, 
       icon = ?, sort_order = ?, status = ? WHERE id = ?`,
      [body.label, body.url, body.page_id, body.target, body.icon, body.sort_order, body.status, params.id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await query('DELETE FROM menu_items WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
