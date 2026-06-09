/**
 * Next.js Middleware
 * Protects admin routes and validates JWT tokens
 */

import { NextRequest, NextResponse } from 'next/server';

// Tell Next.js to use Node.js runtime instead of Edge
export const config = {
  matcher: '/admin/:path*',
  runtime: 'nodejs',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login page, API routes, and static files
  if (
    pathname === '/admin/login' || 
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/')
  ) {
    return NextResponse.next();
  }

  // Check if route is an admin route
  if (pathname.startsWith('/admin')) {
    // Get token from cookie
    const token = request.cookies.get('auth_token')?.value;

    console.log('🔍 Middleware Check:', {
      path: pathname,
      hasToken: !!token
    });

    if (!token) {
      console.log('❌ No token found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Dynamically import jsonwebtoken (only works in Node.js runtime)
      const { verify } = await import('jsonwebtoken');
      
      // Verify JWT token
      const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('✅ Token valid for:', (decoded as any).email);
      
      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      console.log('❌ Invalid token:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}
