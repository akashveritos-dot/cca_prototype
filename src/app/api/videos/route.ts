/**
 * API Route: Videos
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let sql = 'SELECT * FROM videos WHERE status = ? ORDER BY sort_order ASC';
    let params: any[] = ['active'];
    
    if (category) {
      sql = 'SELECT * FROM videos WHERE status = ? AND category = ? ORDER BY sort_order ASC';
      params = ['active', category];
    }
    
    const videos = await query(sql, params);
    return NextResponse.json({ success: true, data: videos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, video_url, video_type, thumbnail_id, duration, category, tags, sort_order, status, created_by } = body;

    if (!title || !video_url) {
      return NextResponse.json({ success: false, error: 'Title and video URL are required' }, { status: 400 });
    }

    const result = await query<any>(
      'INSERT INTO videos (title, description, video_url, video_type, thumbnail_id, duration, category, tags, sort_order, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || null, video_url, video_type || 'youtube', thumbnail_id || null, duration || null, 
       category || null, tags ? JSON.stringify(tags) : null, sort_order || 0, status || 'active', created_by || null]
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
