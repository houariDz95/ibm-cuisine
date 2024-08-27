import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'DZD',
  minimumFractionDigits: 0, // Set the minimumFractionDigits to 0
  maximumFractionDigits: 2, // Keep the maximumFractionDigits to 2 for other cases
});