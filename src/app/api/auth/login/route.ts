/**
 * API Route: Login
 * POST /api/auth/login
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (prevent brute force attacks)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000); // 5 attempts per 15 minutes

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many login attempts. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user from database
    const users = await query<any[]>(
      'SELECT id, email, password_hash, first_name, last_name, status FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Check if user is active
    if (user.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Account is inactive or suspended' },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login
    await query('UPDATE users SET last_login_at = NOW(), login_count = login_count + 1 WHERE id = ?', [user.id]);

    // Get user roles
    const roles = await query(
      `SELECT r.name, r.permissions FROM roles r 
       JOIN user_roles ur ON r.id = ur.role_id 
       WHERE ur.user_id = ?`,
      [user.id]
    );

    // Create JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        roles: roles.map((r: any) => r.name)
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Return user data (without password)
    const userData = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      roles: roles
    };

    // Create response with HttpOnly cookie
    const response = NextResponse.json({
      success: true,
      data: {
        user: userData
      }
    });

    // Set HttpOnly, Secure cookie (protects against XSS)
    response.cookies.set('auth_token', token, {
      httpOnly: true,    // Cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict', // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
