import { differenceInMonths, differenceInYears } from 'date-fns';

export type MilestoneId = 'fresh' | 'month' | 'half' | 'year' | 'deep';

export interface Milestone {
  id: MilestoneId;
  /**
   * Text shown in the card's tier chip. `null` for `fresh`, which shows no
   * chip at all. Every tier that carries an accent colour also carries a
   * label, so the tier is never signalled by colour alone.
   */
  label: string | null;
}

const FRESH: Milestone = { id: 'fresh', label: null };

function plural(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? '' : 's'}`;
}

/**
 * Maps elapsed time onto a colour tier. Thresholds are calendar differences
 * rather than day counts, so leap years and uneven month lengths don't shift
 * the boundary a card crosses.
 */
export function getMilestone(startDate: Date, now: Date): Milestone {
  // A future-dated card hasn't earned anything yet.
  if (startDate > now) {
    return FRESH;
  }

  const years = differenceInYears(now, startDate);
  if (years >= 5) {
    return { id: 'deep', label: plural(years, 'year') };
  }
  if (years >= 1) {
    return { id: 'year', label: plural(years, 'year') };
  }

  const months = differenceInMonths(now, startDate);
  if (months >= 6) {
    return { id: 'half', label: plural(months, 'month') };
  }
  if (months >= 1) {
    return { id: 'month', label: plural(months, 'month') };
  }

  return FRESH;
}
