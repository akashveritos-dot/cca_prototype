/**
 * Authentication Middleware
 * Verify JWT tokens and protect routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export interface AuthUser {
  userId: number;
  email: string;
  roles: string[];
}

/**
 * Verify JWT token from request header
 */
export function verifyToken(request: NextRequest): AuthUser | null {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as AuthUser;
    
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Middleware to protect API routes
 */
export function requireAuth(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Attach user to request
    (request as any).user = user;

    return handler(request, context);
  };
}

/**
 * Check if user has required role
 */
export function requireRole(roles: string[]) {
  return (handler: Function) => {
    return async (request: NextRequest, context?: any) => {
      const user = verifyToken(request);

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const hasRole = user.roles.some(role => roles.includes(role) || role === 'Super Admin');

      if (!hasRole) {
        return NextResponse.json(
          { success: false, error: 'Forbidden - Insufficient permissions' },
          { status: 403 }
        );
      }

      (request as any).user = user;
      return handler(request, context);
    };
  };
}
