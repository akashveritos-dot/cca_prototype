"use server";

import { contactSchema } from "../validation";
import { isRateLimited } from "../rate-limit";
import { headers } from "next/headers";

export async function submitContact(prevState: any, formData: FormData) {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "127.0.0.1";

  // Check rate limit (Max 5 submissions per hour for contact form)
  const isLimited = isRateLimited(ip, { intervalMs: 3600000, maxRequests: 5 });
  if (isLimited) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const botField = formData.get("botField") as string;

  // Validate fields
  const result = contactSchema.safeParse({ name, email, subject, message, botField });
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  // Honeypot detection
  if (botField) {
    // Pretend to be successful to fool bots
    return { success: true };
  }

  // In production, send email via Resend
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({...})
  
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return { success: true };
}
