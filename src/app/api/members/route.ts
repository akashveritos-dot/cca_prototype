/**
 * API Route: Members
 * GET /api/members - List all members
 * POST /api/members - Create new member
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const tier = searchParams.get('tier');
    const offset = (page - 1) * limit;

    let whereConditions: string[] = [];
    let params: any[] = [];

    if (status) {
      whereConditions.push('status = ?');
      params.push(status);
    }

    if (tier) {
      whereConditions.push('tier = ?');
      params.push(tier);
    }

    const whereClause = whereConditions.length > 0 
      ? 'WHERE ' + whereConditions.join(' AND ') 
      : '';

    // Get members with pagination
    const members = await query<any[]>(
      `SELECT 
        m.*,
        med.file_url as logo_url
      FROM members m
      LEFT JOIN media med ON m.logo_id = med.id
      ${whereClause}
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // Get total count
    const countResult = await query<any[]>(
      `SELECT COUNT(*) as total FROM members ${whereClause}`,
      params
    );

    const total = countResult[0].total;

    return NextResponse.json({
      success: true,
      data: members,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Members API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      organization_name,
      contact_person,
      email,
      phone,
      tier,
      description,
      logo_id,
      website,
      industry,
      location,
      joined_date,
      expiry_date,
      status,
      payment_status
    } = body;

    // Validation
    if (!organization_name || !contact_person || !email || !tier) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await query<any[]>(
      'SELECT id FROM members WHERE email = ?',
      [email]
    );

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Member with this email already exists' },
        { status: 409 }
      );
    }

    // Insert member
    const result = await query<any>(
      `INSERT INTO members (
        organization_name, contact_person, email, phone, tier, description,
        logo_id, website, industry, location, joined_date, expiry_date,
        status, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        organization_name,
        contact_person,
        email,
        phone || null,
        tier,
        description || null,
        logo_id || null,
        website || null,
        industry || null,
        location || null,
        joined_date || null,
        expiry_date || null,
        status || 'pending',
        payment_status || 'pending'
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Member created successfully',
        data: { id: result.insertId }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Create member error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
