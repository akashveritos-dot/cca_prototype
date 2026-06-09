"use server";

import { policySubmissionSchema } from "../validation";
import { rateLimit } from "../rate-limit";
import { headers } from "next/headers";

export async function submitPolicyRecommendation(formData: any) {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "127.0.0.1";

  // Check rate limit (Max 5 submissions per hour)
  const { allowed } = rateLimit(ip, 5, 3600000);
  if (!allowed) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  // Validate fields
  const result = policySubmissionSchema.safeParse(formData);
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
