/**
 * API Route: Menu Items
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { menu_id, parent_id, label, url, page_id, target, icon, css_class, sort_order, status } = body;

    const result = await query<any>(
      `INSERT INTO menu_items (menu_id, parent_id, label, url, page_id, target, icon, css_class, sort_order, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [menu_id, parent_id || null, label, url || null, page_id || null, target || '_self', 
       icon || null, css_class || null, sort_order || 0, status || 'active']
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
