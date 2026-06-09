/**
 * API Route: Single Slider
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const slider = await query('SELECT * FROM sliders WHERE id = ? LIMIT 1', [params.id]);
    const items = await query('SELECT * FROM slider_items WHERE slider_id = ? ORDER BY sort_order ASC', [params.id]);
    
    if (!slider || slider.length === 0) {
      return NextResponse.json({ success: false, error: 'Slider not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: { slider: slider[0], items } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    await query(
      'UPDATE sliders SET name = ?, location = ?, autoplay = ?, autoplay_speed = ?, show_arrows = ?, show_dots = ?, transition_effect = ?, status = ? WHERE id = ?',
      [body.name, body.location, body.autoplay, body.autoplay_speed, body.show_arrows, body.show_dots, body.transition_effect, body.status, params.id]
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await query('DELETE FROM sliders WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
