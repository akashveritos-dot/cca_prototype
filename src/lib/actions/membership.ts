"use server";

import { membershipSchema } from "../validation";
import { rateLimit } from "../rate-limit";
import { headers } from "next/headers";

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

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return { success: true };
}
