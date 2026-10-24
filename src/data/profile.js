/**
 * profile.js — facts about me that would otherwise go stale in the JSX.
 *
 * The About section used to hardcode "17-year-old". That string is correct for
 * exactly one year and wrong forever after, and nobody notices a portfolio
 * that is one birthday out of date until someone else points at it. The age is
 * now derived from the date of birth below: it is correct on every render,
 * including a render that happens on my birthday.
 *
 * One rule: the date lives here and nowhere else. Do not paste the computed
 * age into a component, a README or a meta description.
 */

/** Date of birth, ISO `YYYY-MM-DD`. The single source of truth for my age. */
export const BIRTH_DATE = "2009-01-01";

/**
 * Whole years elapsed since BIRTH_DATE at `now`.
 *
 * A birthday that has not happened yet this year means the age is one less.
 * Compared month-first, then day, so the rollover happens on the correct date
 * rather than on 1 January.
 */
export function ageOn(now = new Date()) {
  const [year, month, day] = BIRTH_DATE.split("-").map(Number);
  let years = now.getFullYear() - year;
  const monthNow = now.getMonth() + 1;
  const hadBirthday =
    monthNow > month || (monthNow === month && now.getDate() >= day);
  if (!hadBirthday) years -= 1;
  return years;
}

/** The age to render today. */
export const AGE = ageOn();
