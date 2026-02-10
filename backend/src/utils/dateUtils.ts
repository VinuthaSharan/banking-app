/**
 * Calculate the blocked until date for a user after a transaction
 * Block for next two days excluding weekends
 */
export function calculateBlockedUntilDate(): Date {
  const today = new Date();
  let blockedUntil = new Date(today);
  let daysBlocked = 0;

  // Move to the next day
  blockedUntil.setDate(blockedUntil.getDate() + 1);

  // Skip 2 business days (excluding weekends)
  while (daysBlocked < 2) {
    const dayOfWeek = blockedUntil.getDay();
    // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysBlocked++;
    }
    if (daysBlocked < 2) {
      blockedUntil.setDate(blockedUntil.getDate() + 1);
    }
  }

  return blockedUntil;
}

/**
 * Check if a user is blocked from making transactions
 */
export function isUserBlocked(blockedUntil: string): boolean {
  const now = new Date();
  const blockedUntilDate = new Date(blockedUntil);
  return now < blockedUntilDate;
}

/**
 * Get remaining blocking time in a readable format
 */
export function getRemainingBlockTime(blockedUntil: string): string {
  const now = new Date();
  const blockedUntilDate = new Date(blockedUntil);

  if (now >= blockedUntilDate) {
    return 'No restriction';
  }

  const diffMs = blockedUntilDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return `${diffDays} day(s)`;
}

/**
 * Format date to ISO string
 */
export function formatDate(date: Date): string {
  return date.toISOString();
}
