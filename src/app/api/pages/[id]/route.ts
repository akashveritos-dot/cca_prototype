/**
 * API Route: Single Page
 * GET /api/pages/[id] - Get page by ID
 * PUT /api/pages/[id] - Update page
 * DELETE /api/pages/[id] - Delete page
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPageById, updatePage, deletePage } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const page = await getPageById(parseInt(params.id));
    
    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error: any) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const pageId = parseInt(params.id);

    await updatePage(pageId, body);

    return NextResponse.json({ success: true, message: 'Page updated successfully' });
  } catch (error: any) {
    console.error('Error updating page:', error);
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
    const pageId = parseInt(params.id);
    await deletePage(pageId);

    return NextResponse.json({ success: true, message: 'Page deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
