/**
 * API Route: Sliders
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const sliders = await query('SELECT * FROM sliders WHERE status = ? ORDER BY id DESC', ['active']);
    return NextResponse.json({ success: true, data: sliders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, location, autoplay, autoplay_speed, show_arrows, show_dots, transition_effect, status } = body;

    if (!name || !location) {
      return NextResponse.json({ success: false, error: 'Name and location are required' }, { status: 400 });
    }

    const result = await query<any>(
      'INSERT INTO sliders (name, location, autoplay, autoplay_speed, show_arrows, show_dots, transition_effect, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, location, autoplay !== false, autoplay_speed || 5000, show_arrows !== false, show_dots !== false, 
       transition_effect || 'fade', status || 'active']
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
