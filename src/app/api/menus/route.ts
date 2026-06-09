/**
 * API Route: Menus
 * GET /api/menus - Get all menus
 * POST /api/menus - Create a new menu
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const menus = await query('SELECT * FROM menus ORDER BY id DESC');
    return NextResponse.json({ success: true, data: menus });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, location, description, status } = body;

    const result = await query<any>(
      'INSERT INTO menus (name, location, description, status) VALUES (?, ?, ?, ?)',
      [name, location, description || null, status || 'active']
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
