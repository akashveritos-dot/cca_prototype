import * as z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  botField: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  botField: z.string().optional(),
});

export const membershipSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  organization: z.string().min(2, "Organization name must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  tier: z.string().min(1, "Please select a membership tier"),
  interest: z.string().min(10, "Please describe your interest in at least 10 characters"),
  botField: z.string().optional(),
});

export const policySubmissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  org: z.string().optional(),
  category: z.string().min(1, "Please select a topic area"),
  details: z.string().min(15, "Please describe recommendation details (min 15 characters)"),
  botField: z.string().optional(),
});
