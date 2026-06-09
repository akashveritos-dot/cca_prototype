/**
 * API Route: Single User
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await query(
      'SELECT id, email, first_name, last_name, avatar_url, status, last_login_at, login_count, created_at FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    
    if (!user || user.length === 0) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: user[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { email, password, first_name, last_name, status } = body;

    // Email validation
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
      }

      // Check if email is already taken by another user
      const existing = await query('SELECT id FROM users WHERE email = ? AND id != ?', [email, id]);
      if (existing && existing.length > 0) {
        return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 409 });
      }
    }

    // If password is provided, hash it
    let updateQuery = 'UPDATE users SET email = ?, first_name = ?, last_name = ?, status = ? WHERE id = ?';
    let updateParams = [email, first_name, last_name, status, id];

    if (password) {
      if (password.length < 8) {
        return NextResponse.json({ success: false, error: 'Password must be at least 8 characters' }, { status: 400 });
      }
      const password_hash = await bcrypt.hash(password, 10);
      updateQuery = 'UPDATE users SET email = ?, password_hash = ?, first_name = ?, last_name = ?, status = ? WHERE id = ?';
      updateParams = [email, password_hash, first_name, last_name, status, id];
    }

    await query(updateQuery, updateParams);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // Prevent deleting user ID 1 (super admin)
    if (id === '1') {
      return NextResponse.json({ success: false, error: 'Cannot delete super admin' }, { status: 403 });
    }

    await query('DELETE FROM users WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
