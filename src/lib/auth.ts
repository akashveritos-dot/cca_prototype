/**
 * Client-side Authentication Utilities
 * Uses secure HttpOnly cookies instead of localStorage
 */

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  roles: Array<{ name: string; permissions: any }>;
}

/**
 * Fetch current authenticated user from server
 * Token is in HttpOnly cookie, not accessible to JavaScript
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include', // Include cookies
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    return null;
  }
}

/**
 * Logout user
 * Clears HttpOnly cookie via server
 */
export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    window.location.href = '/admin/login';
  }
}

/**
 * Check if user has specific role
 */
export function hasRole(user: User | null, roleName: string): boolean {
  if (!user) return false;
  return user.roles.some(role => role.name === roleName);
}

/**
 * Login function
 */
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    console.log('Sending login request...');
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies
      body: JSON.stringify({ email, password }),
    });

    console.log('Login response status:', response.status);
    const data = await response.json();
    console.log('Login response data:', data);

    if (!response.ok) {
      return { success: false, error: data.error || 'Login failed' };
    }

    console.log('Login successful!');
    return { success: true, user: data.data.user };
  } catch (error) {
    console.error('Login network error:', error);
    return { success: false, error: 'Network error' };
  }
}
