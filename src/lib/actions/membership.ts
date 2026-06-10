"use server";

import { membershipSchema } from "../validation";
import { rateLimit } from "../rate-limit";
import { headers } from "next/headers";
import { query } from "../db/mysql";

export async function submitMembership(formData: any) {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "127.0.0.1";

  // Check rate limit (Max 3 submissions per hour for membership form)
  const { allowed } = rateLimit(ip, 3, 3600000);
  if (!allowed) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  // Validate fields
  const result = membershipSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  // Honeypot detection
  if (formData.botField) {
    return { success: true };
  }

  try {
    const { name, email, organization, phone, designation, website, tier, interest } = formData;

    // Check if email already exists in members table
    const existing = await query<any[]>(
      'SELECT id, status FROM members WHERE email = ?',
      [email]
    );

    if (existing && existing.length > 0) {
      return { success: false, error: "A membership application with this email already exists." };
    }

    // Map tier string to enum value
    const tierMap: Record<string, string> = {
      'founding': 'founding',
      'institutional': 'institutional',
      'corporate': 'corporate',
      'individual': 'individual',
      'student': 'student'
    };

    const tierValue = tierMap[tier.toLowerCase()] || 'individual';

    // Prepare metadata with additional information
    const metadata = JSON.stringify({
      interest,
      application_date: new Date().toISOString(),
      ip_address: ip
    });

    // Insert membership application
    await query(
      `INSERT INTO members (
        organization_name, 
        contact_person, 
        email, 
        phone, 
        tier, 
        description, 
        website, 
        status, 
        payment_status,
        metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        organization || name, // Use organization name if provided, else contact person name
        name,
        email,
        phone || null,
        tierValue,
        designation,
        website || null,
        'pending',
        'pending',
        metadata
      ]
    );

    return { 
      success: true, 
      message: "Thank you for your membership application! Our team will review it and contact you shortly." 
    };
  } catch (error: any) {
    console.error('Membership submission error:', error);
    return { success: false, error: "Failed to process membership application. Please try again later." };
  }
}
