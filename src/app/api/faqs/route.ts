/**
 * API Route: FAQs
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let sql = 'SELECT * FROM faqs WHERE status = ? ORDER BY sort_order ASC';
    let params: any[] = ['active'];
    
    if (category) {
      sql = 'SELECT * FROM faqs WHERE status = ? AND category = ? ORDER BY sort_order ASC';
      params = ['active', category];
    }
    
    const faqs = await query(sql, params);
    return NextResponse.json({ success: true, data: faqs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, category, page_id, sort_order, status, created_by } = body;

    const result = await query<any>(
      'INSERT INTO faqs (question, answer, category, page_id, sort_order, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [question, answer, category || null, page_id || null, sort_order || 0, status || 'active', created_by || null]
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
