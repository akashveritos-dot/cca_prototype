/**
 * API Route: Single Newsletter Subscription
 * GET /api/newsletter/[id] - Get subscription by ID
 * PATCH /api/newsletter/[id] - Update subscription
 * DELETE /api/newsletter/[id] - Delete subscription
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
      'SELECT * FROM newsletter_subscriptions WHERE id = ?',
      [id]
    );

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Subscription not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0]
    });

  } catch (error: any) {
    console.error('Get subscription error:', error);
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
      'email', 'first_name', 'last_name', 'organization', 'interests', 'status'
    ];

    const updates: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(body)) {
      if (allowedFields.includes(key)) {
        updates.push(`${key} = ?`);
        values.push(key === 'interests' && typeof value === 'object' ? JSON.stringify(value) : value);
      }
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Handle unsubscribe timestamp
    if (body.status === 'unsubscribed') {
      updates.push('unsubscribed_at = NOW()');
    }

    values.push(id);

    await query(
      `UPDATE newsletter_subscriptions SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return NextResponse.json({
      success: true,
      message: 'Subscription updated successfully'
    });

  } catch (error: any) {
    console.error('Update subscription error:', error);
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

    await query('DELETE FROM newsletter_subscriptions WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Subscription deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
