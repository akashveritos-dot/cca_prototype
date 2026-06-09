import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency or a compact representation (e.g. 220M, 3.5k)
 */
export function formatCompactNumber(number: number): string {
  if (number >= 1.0e9) {
    return (number / 1.0e9).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (number >= 1.0e6) {
    return (number / 1.0e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (number >= 1.0e3) {
    return (number / 1.0e3).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return number.toString();
}

/**
 * Formats date into a user friendly string
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-IN", options);
}
