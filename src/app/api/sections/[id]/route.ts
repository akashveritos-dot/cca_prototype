/**
 * API Route: Single Section
 */

import { NextRequest, NextResponse} from 'next/server';
import { query } from '@/lib/db/mysql';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await query(
      'UPDATE page_sections SET section_name = ?, section_key = ?, data = ?, sort_order = ?, status = ? WHERE id = ?',
      [body.section_name, body.section_key, JSON.stringify(body.data || {}), body.sort_order, body.status, params.id]
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM page_sections WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
