import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FRENCH_MONTHS: Record<string, number> = {
  janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
}

/**
 * Parse a French date string like "25 Octobre 2025" into a Date object.
 * Returns epoch 0 if parsing fails, so unparseable dates sort last.
 */
export function parseFrenchDate(dateStr: string): Date {
  const parts = dateStr.trim().split(/\s+/)
  if (parts.length < 3) return new Date(0)
  const day = parseInt(parts[0], 10)
  const month = FRENCH_MONTHS[parts[1].toLowerCase()]
  const year = parseInt(parts[2], 10)
  if (isNaN(day) || month === undefined || isNaN(year)) return new Date(0)
  return new Date(year, month, day)
}
