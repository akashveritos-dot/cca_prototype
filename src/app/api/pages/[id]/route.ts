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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const page = await getPageById(parseInt(id));
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const pageId = parseInt(id);

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pageId = parseInt(id);
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
