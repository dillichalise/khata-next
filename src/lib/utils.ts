import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');

  if (local.length <= 4) {
    // Show only the first character and mask the rest if too short
    return `${local[0]}${'*'.repeat(local.length - 1)}@${domain}`;
  }

  const firstTwo = local.slice(0, 2);
  const lastTwo = local.slice(-2);
  const maskedMiddle = '*'.repeat(local.length - 4);

  return `${firstTwo}${maskedMiddle}${lastTwo}@${domain}`;
}

export function maskPhoneNumber(phone: string): string {
  // Remove non-digit characters for consistent masking
  const digitsOnly = phone.replace(/\D/g, '');

  if (digitsOnly.length <= 6) {
    // Not enough characters to mask properly
    return digitsOnly[0] + '*'.repeat(digitsOnly.length - 1);
  }

  const firstFour = digitsOnly.slice(0, 4);
  const lastTwo = digitsOnly.slice(-2);
  const maskedMiddle = '*'.repeat(digitsOnly.length - 5);

  return `${firstFour}${maskedMiddle}${lastTwo}`;
}

/**
 * Rounds a decimal number to the specified number of decimal places.
 * @param value - A number with decimal places.
 * @param precision - Number of decimal places to round to. Default is 0.
 * @returns The rounded number.
 */
export function roundDecimal(value: number, precision: number = 0): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}
