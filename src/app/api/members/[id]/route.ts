/**
 * API Route: Single Member
 * GET /api/members/[id] - Get member by ID
 * PATCH /api/members/[id] - Update member
 * DELETE /api/members/[id] - Delete member
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await query<any[]>(
      `SELECT 
        m.*,
        med.file_url as logo_url,
        med.filename as logo_filename
      FROM members m
      LEFT JOIN media med ON m.logo_id = med.id
      WHERE m.id = ?`,
      [id]
    );

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0]
    });

  } catch (error: any) {
    console.error('Get member error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const allowedFields = [
      'organization_name', 'contact_person', 'email', 'phone', 'tier',
      'description', 'logo_id', 'website', 'industry', 'location',
      'joined_date', 'expiry_date', 'status', 'payment_status', 'metadata'
    ];

    const updates: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(body)) {
      if (allowedFields.includes(key)) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    values.push(id);

    await query(
      `UPDATE members SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return NextResponse.json({
      success: true,
      message: 'Member updated successfully'
    });

  } catch (error: any) {
    console.error('Update member error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
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

    await query('DELETE FROM members WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Member deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete member error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
