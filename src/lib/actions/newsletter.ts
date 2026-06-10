"use server";

import { newsletterSchema } from "../validation";
import { rateLimit } from "../rate-limit";
import { headers } from "next/headers";
import { query } from "../db/mysql";
import crypto from "crypto";

export async function submitNewsletter(email: string, botField?: string) {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "127.0.0.1";
  const userAgent = headerList.get("user-agent") || "";

  // Check rate limit (Max 10 per hour)
  const { allowed } = rateLimit(ip, 10, 3600000);
  if (!allowed) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  // Validate fields
  const result = newsletterSchema.safeParse({ email, botField });
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  // Honeypot detection
  if (botField) {
    return { success: true };
  }

  try {
    // Check if email already exists
    const existing = await query<any[]>(
      'SELECT id, status FROM newsletter_subscriptions WHERE email = ?',
      [email]
    );

    if (existing && existing.length > 0) {
      const sub = existing[0];
      if (sub.status === 'subscribed') {
        return { success: false, error: "This email is already subscribed to our newsletter." };
      } else if (sub.status === 'unsubscribed') {
        // Resubscribe
        await query(
          'UPDATE newsletter_subscriptions SET status = ?, ip_address = ?, user_agent = ?, updated_at = NOW() WHERE email = ?',
          ['subscribed', ip, userAgent, email]
        );
        return { success: true, message: "Welcome back! You've been resubscribed to our newsletter." };
      }
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Insert new subscription
    await query(
      'INSERT INTO newsletter_subscriptions (email, status, verification_token, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
      [email, 'subscribed', verificationToken, ip, userAgent]
    );

    return { success: true, message: "Thank you for subscribing to our newsletter!" };
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return { success: false, error: "Failed to process subscription. Please try again later." };
  }
}
