/**
 * API Route: Media
 * GET /api/media - Get all media
 * DELETE /api/media/[id] - Delete media
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const media = await query<any[]>(
      'SELECT * FROM media WHERE status = ? ORDER BY created_at DESC',
      ['active']
    );
    return NextResponse.json({ success: true, data: media });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    await query('DELETE FROM media WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Media deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}
