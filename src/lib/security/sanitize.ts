/**
 * Security: Input Sanitization
 * Protect against XSS, SQL Injection, and other attacks
 */

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Basic XSS prevention - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '');
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .substring(0, 1000); // Limit length
}

/**
 * Sanitize email
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  return email.toLowerCase().trim();
}

/**
 * Validate and sanitize URL
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    
    return parsed.toString();
  } catch {
    return '';
  }
}

/**
 * Sanitize slug (URL-safe string)
 */
export function sanitizeSlug(slug: string): string {
  if (!slug) return '';
  
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 200);
}

/**
 * Validate integer
 */
export function validateInteger(value: any): number | null {
  const num = parseInt(value);
  return isNaN(num) ? null : num;
}

/**
 * Validate and sanitize JSON
 */
export function sanitizeJson(data: any): any {
  try {
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Prevent SQL injection by validating parameters
 * Note: Prepared statements already prevent SQL injection,
 * but this adds an extra layer of validation
 */
export function validateSqlParam(param: any): boolean {
  if (param === null || param === undefined) return true;
  
  const type = typeof param;
  
  // Only allow safe types
  if (!['string', 'number', 'boolean'].includes(type)) {
    return false;
  }
  
  // Check for SQL injection patterns in strings
  if (type === 'string') {
    const dangerous = /(\bOR\b|\bAND\b|--|;|\/\*|\*\/|xp_|sp_|UNION|SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)/i;
    return !dangerous.test(param);
  }
  
  return true;
}

/**
 * Rate limiting helper - simple in-memory store
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(identifier: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record || now > record.resetAt) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs
    });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

/**
 * Get client IP address
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return request.headers.get('x-real-ip') || 'unknown';
}

/**
 * Validate file upload
 */
export function validateFileUpload(
  filename: string,
  size: number,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
): { valid: boolean; error?: string } {
  
  // Check file size (default 10MB)
  const maxSize = parseInt(process.env.MAX_FILE_SIZE || '10485760');
  if (size > maxSize) {
    return { valid: false, error: 'File size exceeds limit' };
  }
  
  // Check file extension
  const ext = filename.split('.').pop()?.toLowerCase();
  const dangerousExts = ['exe', 'bat', 'cmd', 'sh', 'php', 'jsp', 'asp'];
  if (ext && dangerousExts.includes(ext)) {
    return { valid: false, error: 'File type not allowed' };
  }
  
  return { valid: true };
}
