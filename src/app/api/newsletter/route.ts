/**
 * API Route: Newsletter Subscriptions
 * GET /api/newsletter - List all newsletter subscriptions
 * POST /api/newsletter - Create new subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status');
    const offset = (page - 1) * limit;

    let whereClause = '';
    let params: any[] = [];

    if (status) {
      whereClause = 'WHERE status = ?';
      params.push(status);
    }

    // Get subscriptions with pagination
    const subscriptions = await query<any[]>(
      `SELECT 
        id, email, first_name, last_name, organization, interests,
        status, verified_at, created_at, updated_at
      FROM newsletter_subscriptions
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // Get total count
    const countResult = await query<any[]>(
      `SELECT COUNT(*) as total FROM newsletter_subscriptions ${whereClause}`,
      params
    );

    const total = countResult[0].total;

    return NextResponse.json({
      success: true,
      data: subscriptions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, first_name, last_name, organization, interests } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await query<any[]>(
      'SELECT id, status FROM newsletter_subscriptions WHERE email = ?',
      [email]
    );

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Insert subscription
    const result = await query<any>(
      `INSERT INTO newsletter_subscriptions (
        email, first_name, last_name, organization, interests,
        status, verification_token
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        first_name || null,
        last_name || null,
        organization || null,
        interests ? JSON.stringify(interests) : null,
        'subscribed',
        verificationToken
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription created successfully',
        data: { id: result.insertId }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Create subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
