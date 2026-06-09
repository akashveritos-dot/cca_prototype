/**
 * API Route: Single Media
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM media WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true, message: 'Media deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}
