/**
 * API Route: Users
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    // Don't return password hashes
    const users = await query('SELECT id, email, first_name, last_name, avatar_url, status, last_login_at, login_count, created_at FROM users ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, first_name, last_name, status } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 409 });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    const result = await query<any>(
      'INSERT INTO users (email, password_hash, first_name, last_name, status) VALUES (?, ?, ?, ?, ?)',
      [email, password_hash, first_name || null, last_name || null, status || 'active']
    );

    return NextResponse.json({ success: true, data: { id: result.insertId } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
