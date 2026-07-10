import { useMemo, useState } from 'react';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { TaskTable } from '@/components/candidate/TaskTable';
import { Loader } from '@/components/shared/misc';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/hooks/useCourses';
import { useProgress, useUpdateProgress } from '@/hooks/useProgress';
import { STATUS, summarizeCandidate } from '@/lib/progress';
import { cn } from '@/lib/utils';

const TABS = [
  { key: 'ALL', label: 'All' },
  { key: STATUS.NOT_STARTED, label: 'Not Started' },
  { key: STATUS.IN_PROGRESS, label: 'In Progress' },
  { key: STATUS.COMPLETED, label: 'Completed' },
];

export default function MyTasks() {
  const { user } = useAuth();
  const { data: courses = [], isLoading: coursesLoading } = useCourses();
  const { data: progress = [], isLoading: progressLoading } = useProgress({ candidateId: user.id });
  const updateProgress = useUpdateProgress();

  const [activeTab, setActiveTab] = useState('ALL');

  const isLoading = coursesLoading || progressLoading;

  const summary = useMemo(() => summarizeCandidate(progress, user.id, courses.length), [progress, courses.length, user.id]);

  const filteredCourses = useMemo(() => {
    if (activeTab === 'ALL') return courses;
    return courses.filter((course) => {
      const row = progress.find((p) => p.courseId === course.id);
      return (row?.status || STATUS.NOT_STARTED) === activeTab;
    });
  }, [courses, progress, activeTab]);

  function handleStatusChange(row, courseId, status) {
    if (row) updateProgress.mutate({ id: row.id, data: { status } });
  }

  function handleDateChange(row, courseId, date) {
    if (row) updateProgress.mutate({ id: row.id, data: { completionDate: date || null } });
  }

  if (isLoading) return <Loader label="Loading your tasks…" className="h-[60vh]" />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">My Tasks</h1>
        <p className="mt-1 text-sm text-ink-secondary">Welcome back, {user.name.split(' ')[0]}. Here's where you stand.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Completed" value={summary.completed} icon={CheckCircle2} accent="forest" />
        <StatCard title="In progress" value={summary.inProgress} icon={Clock} accent="amber" />
        <StatCard title="Remaining" value={summary.remaining} icon={ListTodo} accent="rose" />
        <StatCard title="Overall progress" ring={summary.percent} />
      </div>

      <div className="flex gap-1 rounded-md border border-hairline bg-white p-1 self-start">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab.key ? 'bg-forest-soft text-forest-hover' : 'text-ink-secondary hover:text-ink'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <TaskTable
        courses={filteredCourses}
        progress={progress}
        candidateId={user.id}
        onStatusChange={handleStatusChange}
        onDateChange={handleDateChange}
      />
    </div>
  );
}
