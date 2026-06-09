/**
 * API Route: Page Sections
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('page_id');

    if (!pageId) {
      return NextResponse.json(
        { success: false, error: 'Page ID is required' },
        { status: 400 }
      );
    }

    const sections = await query(
      `SELECT ps.*, st.name as template_name, st.component_name 
       FROM page_sections ps 
       LEFT JOIN section_templates st ON ps.template_id = st.id 
       WHERE ps.page_id = ? AND ps.status = ? 
       ORDER BY ps.sort_order ASC`,
      [pageId, 'active']
    );

    return NextResponse.json({ success: true, data: sections });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page_id, template_id, section_name, section_key, data, sort_order, status } = body;

    if (!page_id || !template_id || !section_key) {
      return NextResponse.json(
        { success: false, error: 'Page ID, template ID, and section key are required' },
        { status: 400 }
      );
    }

    const result = await query<any>(
      'INSERT INTO page_sections (page_id, template_id, section_name, section_key, data, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [page_id, template_id, section_name || null, section_key, data ? JSON.stringify(data) : null, sort_order || 0, status || 'active']
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
