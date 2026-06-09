/**
 * API Route: Get Current User
 * GET /api/auth/me
 */

import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { query } from '@/lib/db/mysql';

export async function GET(request: NextRequest) {
  try {
    // Get token from HttpOnly cookie
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;

    // Get user from database
    const users = await query<any[]>(
      'SELECT id, email, first_name, last_name, status FROM users WHERE id = ? LIMIT 1',
      [decoded.userId]
    );

    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const user = users[0];

    // Get user roles
    const roles = await query(
      `SELECT r.name, r.permissions FROM roles r 
       JOIN user_roles ur ON r.id = ur.role_id 
       WHERE ur.user_id = ?`,
      [user.id]
    );

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        roles: roles
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
}
