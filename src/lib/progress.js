// Status enum shared across the app. BLOCKED is an admin-only addition
// beyond the original prototype's three states.
export const STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  BLOCKED: 'BLOCKED',
};

export const STATUS_LABEL = {
  [STATUS.NOT_STARTED]: 'Not Started',
  [STATUS.IN_PROGRESS]: 'In Progress',
  [STATUS.COMPLETED]: 'Completed',
  [STATUS.BLOCKED]: 'Blocked',
};

export const ACTIVITY_TYPE = {
  TRAINING: 'Training',
  TEST: 'Test',
  PROJECT: 'Project',
};

/**
 * Find the progress row for a given candidate + course pair.
 * @param {Array} progressList
 * @param {string} candidateId
 * @param {string} courseId
 */
export function findProgress(progressList, candidateId, courseId) {
  return progressList.find(
    (p) => p.candidateId === candidateId && p.courseId === courseId
  );
}

/**
 * Roll up a single candidate's progress rows into counts + percentage.
 * @param {Array} progressList - all progress rows
 * @param {string} candidateId
 * @param {number} totalCourses - total courses assigned (denominator)
 */
export function summarizeCandidate(progressList, candidateId, totalCourses) {
  const rows = progressList.filter((p) => p.candidateId === candidateId);
  const completed = rows.filter((p) => p.status === STATUS.COMPLETED).length;
  const inProgress = rows.filter((p) => p.status === STATUS.IN_PROGRESS).length;
  const blocked = rows.filter((p) => p.status === STATUS.BLOCKED).length;
  const remaining = Math.max(totalCourses - completed - inProgress - blocked, 0);
  const percent = totalCourses > 0 ? Math.round((completed / totalCourses) * 100) : 0;

  return { completed, inProgress, blocked, remaining, total: totalCourses, percent };
}

/**
 * Format an ISO date string (or Date) as "MMM D, YYYY". Returns a dash for null/NA.
 * @param {string|Date|null} value
 */
export function formatDate(value) {
  if (!value || value === 'NA') return '—';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a Date as an ISO date-only string (YYYY-MM-DD), suitable for
 * <input type="date"> values and mock API storage.
 * @param {Date} date
 */
export function toISODateOnly(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
