import { ADMIN, CANDIDATES, COURSES, PROGRESS, LOGS } from './seed';
import { STATUS } from '@/lib/progress';

// ---------------------------------------------------------------------------
// In-memory "database". Deep-cloned from seed data on module load so repeated
// edits during a session don't mutate the seed module itself. This is a
// stand-in for the real backend — every exported function here is async and
// returns plain data, mirroring the shape the real Axios service layer will
// return once the Express/Prisma backend exists. Swapping this module out for
// real HTTP calls should require no changes to hooks or components.
// ---------------------------------------------------------------------------

let db = {
  admin: { ...ADMIN },
  candidates: CANDIDATES.map((c) => ({ ...c })),
  courses: COURSES.map((c) => ({ ...c })),
  progress: PROGRESS.map((p) => ({ ...p })),
  logs: LOGS.map((l) => ({ ...l })),
};

const LATENCY_MS = 250;

function delay(ms = LATENCY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

class ApiError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

function nowParts() {
  const now = new Date();
  return {
    date: now.toISOString().slice(0, 10),
    time: now.toTimeString().slice(0, 5),
  };
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function login({ email, password }) {
  await delay();

  if (email === db.admin.email && password === db.admin.password) {
    const token = `mock-token-admin`;
    return {
      token,
      user: { id: db.admin.id, name: db.admin.name, email: db.admin.email, role: 'ADMIN' },
    };
  }

  const candidate = db.candidates.find((c) => c.email === email && c.password === password);
  if (candidate) {
    const token = `mock-token-${candidate.id}`;
    return {
      token,
      user: { id: candidate.id, name: candidate.name, email: candidate.email, role: 'CANDIDATE', colorIndex: candidate.colorIndex },
    };
  }

  throw new ApiError('Invalid email or password', 401);
}

export async function logout() {
  await delay(100);
  return { success: true };
}

export async function getMe(token) {
  await delay(100);
  if (!token) throw new ApiError('Not authenticated', 401);
  if (token === 'mock-token-admin') {
    return { id: db.admin.id, name: db.admin.name, email: db.admin.email, role: 'ADMIN' };
  }
  const candidate = db.candidates.find((c) => token === `mock-token-${c.id}`);
  if (candidate) {
    return { id: candidate.id, name: candidate.name, email: candidate.email, role: 'CANDIDATE', colorIndex: candidate.colorIndex };
  }
  throw new ApiError('Invalid session', 401);
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export async function getDashboardStats() {
  await delay();
  const totalCandidates = db.candidates.length;
  const totalCourses = db.courses.length;
  const totalPossible = totalCandidates * totalCourses;
  const totalCompleted = db.progress.filter((p) => p.status === STATUS.COMPLETED).length;
  const avgProgress = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
  const today = nowParts().date;
  const logsToday = db.logs.filter((l) => l.date === today).length;

  return { totalCandidates, totalCourses, avgProgress, logsToday };
}

export async function getProgressMatrix() {
  await delay();
  return {
    candidates: db.candidates.map((c) => ({ id: c.id, name: c.name, colorIndex: c.colorIndex })),
    courses: db.courses.map((c) => ({ id: c.id, sr: c.sr, name: c.name })),
    progress: db.progress.map((p) => ({ ...p })),
  };
}

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------

export async function getCourses() {
  await delay();
  return [...db.courses].sort((a, b) => a.sr - b.sr);
}

export async function getCourse(id) {
  await delay();
  const course = db.courses.find((c) => c.id === id);
  if (!course) throw new ApiError('Course not found', 404);
  return { ...course };
}

export async function createCourse(data) {
  await delay();
  const nextSr = db.courses.length ? Math.max(...db.courses.map((c) => c.sr)) + 1 : 1;
  const course = {
    id: uid('co'),
    sr: nextSr,
    name: data.name,
    activityType: data.activityType,
    targetDate: data.targetDate || null,
    resourceLink: data.resourceLink || null,
  };
  db.courses.push(course);

  // Seed a NOT_STARTED progress row for every existing candidate.
  db.candidates.forEach((c) => {
    db.progress.push({ id: uid('p'), candidateId: c.id, courseId: course.id, status: STATUS.NOT_STARTED, completionDate: null });
  });

  return { ...course };
}

export async function updateCourse(id, data) {
  await delay();
  const idx = db.courses.findIndex((c) => c.id === id);
  if (idx === -1) throw new ApiError('Course not found', 404);
  db.courses[idx] = { ...db.courses[idx], ...data };
  return { ...db.courses[idx] };
}

export async function deleteCourse(id) {
  await delay();
  const idx = db.courses.findIndex((c) => c.id === id);
  if (idx === -1) throw new ApiError('Course not found', 404);
  db.courses.splice(idx, 1);
  db.progress = db.progress.filter((p) => p.courseId !== id);
  db.logs = db.logs.filter((l) => l.courseId !== id);
  return { success: true };
}

// ---------------------------------------------------------------------------
// Candidates
// ---------------------------------------------------------------------------

export async function getCandidates() {
  await delay();
  return db.candidates.map((c) => ({ id: c.id, name: c.name, email: c.email, colorIndex: c.colorIndex }));
}

export async function getCandidate(id) {
  await delay();
  const candidate = db.candidates.find((c) => c.id === id);
  if (!candidate) throw new ApiError('Candidate not found', 404);
  return { id: candidate.id, name: candidate.name, email: candidate.email, colorIndex: candidate.colorIndex };
}

export async function createCandidate(data) {
  await delay();
  if (db.candidates.some((c) => c.email === data.email) || db.admin.email === data.email) {
    throw new ApiError('A user with this email already exists', 409);
  }
  const colorIndex = db.candidates.length % 6;
  const candidate = {
    id: uid('c'),
    name: data.name,
    email: data.email,
    password: data.password, // hashed server-side once real backend exists
    colorIndex,
  };
  db.candidates.push(candidate);

  db.courses.forEach((course) => {
    db.progress.push({ id: uid('p'), candidateId: candidate.id, courseId: course.id, status: STATUS.NOT_STARTED, completionDate: null });
  });

  return { id: candidate.id, name: candidate.name, email: candidate.email, colorIndex: candidate.colorIndex };
}

export async function updateCandidate(id, data) {
  await delay();
  const idx = db.candidates.findIndex((c) => c.id === id);
  if (idx === -1) throw new ApiError('Candidate not found', 404);
  db.candidates[idx] = { ...db.candidates[idx], ...data };
  const c = db.candidates[idx];
  return { id: c.id, name: c.name, email: c.email, colorIndex: c.colorIndex };
}

export async function deleteCandidate(id) {
  await delay();
  const idx = db.candidates.findIndex((c) => c.id === id);
  if (idx === -1) throw new ApiError('Candidate not found', 404);
  db.candidates.splice(idx, 1);
  // Cascade-delete their progress rows and logs.
  db.progress = db.progress.filter((p) => p.candidateId !== id);
  db.logs = db.logs.filter((l) => l.candidateId !== id);
  return { success: true };
}

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------

export async function getProgress({ candidateId, courseId, status } = {}) {
  await delay();
  return db.progress
    .filter((p) => (candidateId ? p.candidateId === candidateId : true))
    .filter((p) => (courseId ? p.courseId === courseId : true))
    .filter((p) => (status ? p.status === status : true))
    .map((p) => ({ ...p }));
}

export async function updateProgress(id, data) {
  await delay();
  const idx = db.progress.findIndex((p) => p.id === id);
  if (idx === -1) throw new ApiError('Progress record not found', 404);

  const current = db.progress[idx];
  const next = { ...current, ...data };

  // Completing a task auto-fills today's date if empty; un-completing clears it.
  if (data.status) {
    if (data.status === STATUS.COMPLETED && !next.completionDate) {
      next.completionDate = nowParts().date;
    } else if (data.status !== STATUS.COMPLETED && current.status === STATUS.COMPLETED && data.completionDate === undefined) {
      next.completionDate = null;
    }
  }

  db.progress[idx] = next;
  return { ...next };
}

// ---------------------------------------------------------------------------
// Daily logs
// ---------------------------------------------------------------------------

export async function getLogs() {
  await delay();
  return [...db.logs].sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));
}

export async function getLogsByCandidate(candidateId) {
  await delay();
  return db.logs
    .filter((l) => l.candidateId === candidateId)
    .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));
}

export async function createLog(data) {
  await delay();
  const { date, time } = nowParts();
  const log = {
    id: uid('l'),
    candidateId: data.candidateId,
    courseId: data.courseId,
    hoursWorked: Number(data.hoursWorked),
    notes: data.notes || '',
    date,
    time,
  };
  db.logs.unshift(log);
  return { ...log };
}
