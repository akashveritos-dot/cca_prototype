/**
 * API Route: SEO Metadata
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entity_type');
    const entityId = searchParams.get('entity_id');

    if (!entityType || !entityId) {
      return NextResponse.json(
        { success: false, error: 'Entity type and ID are required' },
        { status: 400 }
      );
    }

    const seo = await query(
      'SELECT * FROM seo_metadata WHERE entity_type = ? AND entity_id = ? LIMIT 1',
      [entityType, entityId]
    );

    return NextResponse.json({
      success: true,
      data: seo.length > 0 ? seo[0] : null
    });
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
    const {
      entity_type, entity_id, meta_title, meta_description, meta_keywords,
      og_title, og_description, og_image_id, og_type,
      twitter_card, twitter_title, twitter_description, twitter_image_id,
      canonical_url, robots, schema_markup
    } = body;

    if (!entity_type || !entity_id) {
      return NextResponse.json(
        { success: false, error: 'Entity type and ID are required' },
        { status: 400 }
      );
    }

    // Check if SEO metadata already exists
    const existing = await query(
      'SELECT id FROM seo_metadata WHERE entity_type = ? AND entity_id = ?',
      [entity_type, entity_id]
    );

    if (existing && existing.length > 0) {
      // Update existing
      await query(
        `UPDATE seo_metadata SET meta_title = ?, meta_description = ?, meta_keywords = ?,
         og_title = ?, og_description = ?, og_image_id = ?, og_type = ?,
         twitter_card = ?, twitter_title = ?, twitter_description = ?, twitter_image_id = ?,
         canonical_url = ?, robots = ?, schema_markup = ? 
         WHERE entity_type = ? AND entity_id = ?`,
        [meta_title, meta_description, meta_keywords, og_title, og_description, og_image_id, og_type,
         twitter_card, twitter_title, twitter_description, twitter_image_id,
         canonical_url, robots || 'index,follow', schema_markup ? JSON.stringify(schema_markup) : null,
         entity_type, entity_id]
      );

      return NextResponse.json({ success: true, message: 'SEO metadata updated' });
    } else {
      // Insert new
      const result = await query<any>(
        `INSERT INTO seo_metadata (entity_type, entity_id, meta_title, meta_description, meta_keywords,
         og_title, og_description, og_image_id, og_type, twitter_card, twitter_title, twitter_description,
         twitter_image_id, canonical_url, robots, schema_markup)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [entity_type, entity_id, meta_title, meta_description, meta_keywords,
         og_title, og_description, og_image_id, og_type, twitter_card, twitter_title, twitter_description,
         twitter_image_id, canonical_url, robots || 'index,follow', schema_markup ? JSON.stringify(schema_markup) : null]
      );

      return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
