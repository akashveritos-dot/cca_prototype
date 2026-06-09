/**
 * API Route: Pages
 * GET /api/pages - Get all pages
 * POST /api/pages - Create a new page
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllPages, createPage } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const pages = await getAllPages();
    return NextResponse.json({ success: true, data: pages });
  } catch (error: any) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const pageId = await createPage(body);
    
    return NextResponse.json(
      { success: true, data: { id: pageId } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
