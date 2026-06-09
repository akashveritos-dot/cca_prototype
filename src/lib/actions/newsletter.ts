"use server";

import { newsletterSchema } from "../validation";
import { isRateLimited } from "../rate-limit";
import { headers } from "next/headers";

export async function submitNewsletter(email: string, botField?: string) {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "127.0.0.1";

  // Check rate limit (Max 10 per hour)
  const isLimited = isRateLimited(ip, { intervalMs: 3600000, maxRequests: 10 });
  if (isLimited) {
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

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return { success: true };
}
