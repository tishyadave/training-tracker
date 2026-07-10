import { STATUS, ACTIVITY_TYPE } from '@/lib/progress';

export const ADMIN = {
  id: 'admin-1',
  name: 'Admin',
  email: 'admin@company.com',
  password: 'admin2026',
  role: 'ADMIN',
};

export const CANDIDATES = [
  { id: 'c1', name: 'Tishya Dave', email: 'tishya.dave@sceniuz.com', password: 'candidate123', colorIndex: 0 },
  { id: 'c2', name: 'Rohan Mehta', email: 'rohan.mehta@company.com', password: 'candidate123', colorIndex: 1 },
  { id: 'c3', name: 'Priya Nair', email: 'priya.nair@company.com', password: 'candidate123', colorIndex: 2 },
  { id: 'c4', name: 'Karan Shah', email: 'karan.shah@company.com', password: 'candidate123', colorIndex: 3 },
  { id: 'c5', name: 'Divya Iyer', email: 'divya.iyer@company.com', password: 'candidate123', colorIndex: 4 },
  { id: 'c6', name: 'Arjun Verma', email: 'arjun.verma@company.com', password: 'candidate123', colorIndex: 5 },
];

export const COURSES = [
  { id: 'co1', sr: 1, name: 'Power BI Fundamentals', activityType: ACTIVITY_TYPE.TRAINING, targetDate: '2026-07-20', resourceLink: 'https://learn.microsoft.com/power-bi/fundamentals' },
  { id: 'co2', sr: 2, name: 'Data Modeling Basics', activityType: ACTIVITY_TYPE.TRAINING, targetDate: '2026-07-25', resourceLink: 'https://learn.microsoft.com/power-bi/modeling' },
  { id: 'co3', sr: 3, name: 'DAX Essentials', activityType: ACTIVITY_TYPE.TRAINING, targetDate: '2026-08-01', resourceLink: 'https://learn.microsoft.com/dax/basics' },
  { id: 'co4', sr: 4, name: 'Module 1 Assessment', activityType: ACTIVITY_TYPE.TEST, targetDate: '2026-08-05', resourceLink: null },
  { id: 'co5', sr: 5, name: 'Advanced Visualizations', activityType: ACTIVITY_TYPE.TRAINING, targetDate: '2026-08-12', resourceLink: 'https://learn.microsoft.com/power-bi/visuals' },
  { id: 'co6', sr: 6, name: 'Row-Level Security', activityType: ACTIVITY_TYPE.TRAINING, targetDate: '2026-08-18', resourceLink: 'https://learn.microsoft.com/power-bi/rls' },
  { id: 'co7', sr: 7, name: 'Capstone Dashboard Project', activityType: ACTIVITY_TYPE.PROJECT, targetDate: null, resourceLink: null },
  { id: 'co8', sr: 8, name: 'Final Certification Test', activityType: ACTIVITY_TYPE.TEST, targetDate: null, resourceLink: null },
];

// One progress row per (candidate x course) pair, with a mix of statuses
// so the dashboard/matrix/tracker views all have realistic data to show.
function buildProgress() {
  const rows = [];
  let id = 1;
  const pattern = [
    [STATUS.COMPLETED, STATUS.COMPLETED, STATUS.IN_PROGRESS, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED],
    [STATUS.COMPLETED, STATUS.COMPLETED, STATUS.COMPLETED, STATUS.COMPLETED, STATUS.IN_PROGRESS, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED],
    [STATUS.COMPLETED, STATUS.IN_PROGRESS, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED],
    [STATUS.COMPLETED, STATUS.COMPLETED, STATUS.COMPLETED, STATUS.COMPLETED, STATUS.COMPLETED, STATUS.COMPLETED, STATUS.IN_PROGRESS, STATUS.NOT_STARTED],
    [STATUS.BLOCKED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED],
    [STATUS.COMPLETED, STATUS.COMPLETED, STATUS.COMPLETED, STATUS.IN_PROGRESS, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED, STATUS.NOT_STARTED],
  ];

  CANDIDATES.forEach((candidate, ci) => {
    COURSES.forEach((course, coi) => {
      const status = pattern[ci][coi];
      rows.push({
        id: `p${id++}`,
        candidateId: candidate.id,
        courseId: course.id,
        status,
        completionDate: status === STATUS.COMPLETED ? '2026-07-0' + (((ci + coi) % 8) + 1) : null,
      });
    });
  });
  return rows;
}

export const PROGRESS = buildProgress();

export const LOGS = [
  { id: 'l1', candidateId: 'c1', courseId: 'co3', hoursWorked: 2.5, notes: 'Worked through DAX filter context examples.', date: '2026-07-10', time: '09:15' },
  { id: 'l2', candidateId: 'c2', courseId: 'co5', hoursWorked: 1.5, notes: 'Started on advanced visuals module.', date: '2026-07-10', time: '10:02' },
  { id: 'l3', candidateId: 'c4', courseId: 'co7', hoursWorked: 3, notes: 'Drafted capstone dashboard wireframe.', date: '2026-07-09', time: '16:40' },
  { id: 'l4', candidateId: 'c6', courseId: 'co4', hoursWorked: 1, notes: 'Reviewed practice questions for Module 1 assessment.', date: '2026-07-09', time: '11:20' },
  { id: 'l5', candidateId: 'c1', courseId: 'co2', hoursWorked: 2, notes: 'Completed data modeling exercises.', date: '2026-07-08', time: '14:05' },
];
