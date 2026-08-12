import { differenceInMonths, differenceInYears } from 'date-fns';

export type MilestoneId = 'fresh' | 'month' | 'half' | 'year' | 'deep';

export interface Milestone {
  id: MilestoneId;
}

/**
 * Maps elapsed time onto a colour tier. Thresholds are calendar differences
 * rather than day counts, so leap years and uneven month lengths don't shift
 * the boundary a card crosses.
 */
export function getMilestone(startDate: Date, now: Date): Milestone {
  // A future-dated card hasn't earned anything yet.
  if (startDate > now) {
    return { id: 'fresh' };
  }

  const years = differenceInYears(now, startDate);
  if (years >= 5) {
    return { id: 'deep' };
  }
  if (years >= 1) {
    return { id: 'year' };
  }

  const months = differenceInMonths(now, startDate);
  if (months >= 6) {
    return { id: 'half' };
  }
  if (months >= 1) {
    return { id: 'month' };
  }

  return { id: 'fresh' };
}
