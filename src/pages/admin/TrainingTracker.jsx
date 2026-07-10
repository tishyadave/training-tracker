import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Loader } from '@/components/shared/misc';
import { CourseTable } from '@/components/admin/CourseTable';
import { CourseFormDialog } from '@/components/admin/CourseFormDialog';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from '@/hooks/useCourses';
import { useCandidates } from '@/hooks/useCandidates';
import { useProgress, useUpdateProgress } from '@/hooks/useProgress';
import { STATUS } from '@/lib/progress';
import { cn } from '@/lib/utils';

const TABS = [
  { key: 'ALL', label: 'All' },
  { key: STATUS.NOT_STARTED, label: 'Not Started' },
  { key: STATUS.IN_PROGRESS, label: 'In Progress' },
  { key: STATUS.COMPLETED, label: 'Completed' },
];

export default function TrainingTracker() {
  const { data: courses = [], isLoading: coursesLoading } = useCourses();
  const { data: candidates = [], isLoading: candidatesLoading } = useCandidates();
  const { data: progress = [], isLoading: progressLoading } = useProgress();

  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const updateProgress = useUpdateProgress();

  const [activeTab, setActiveTab] = useState('ALL');
  const [candidateFilter, setCandidateFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);

  const isLoading = coursesLoading || candidatesLoading || progressLoading;

  const filteredCourses = useMemo(() => {
    if (activeTab === 'ALL') return courses;
    // When filtering by status with a single candidate selected, filter by
    // that candidate's status for each course. With "all", a course is
    // included if any candidate has that status.
    return courses.filter((course) => {
      const rows = progress.filter((p) => p.courseId === course.id && (candidateFilter === 'all' || p.candidateId === candidateFilter));
      return rows.some((r) => r.status === activeTab);
    });
  }, [courses, progress, activeTab, candidateFilter]);

  function handleAdd() {
    setEditingCourse(null);
    setFormOpen(true);
  }

  function handleEdit(course) {
    setEditingCourse(course);
    setFormOpen(true);
  }

  function handleFormSubmit(values) {
    if (editingCourse) {
      updateCourse.mutate({ id: editingCourse.id, data: values }, { onSuccess: () => setFormOpen(false) });
    } else {
      createCourse.mutate(values, { onSuccess: () => setFormOpen(false) });
    }
  }

  function handleDeleteConfirm() {
    deleteCourse.mutate(deletingCourse.id, { onSuccess: () => setDeletingCourse(null) });
  }

  function handleStatusChange(row, candidateId, courseId, status) {
    if (row) {
      updateProgress.mutate({ id: row.id, data: { status } });
    }
  }

  function handleDateChange(row, candidateId, courseId, date) {
    if (row) {
      updateProgress.mutate({ id: row.id, data: { completionDate: date || null } });
    }
  }

  if (isLoading) return <Loader label="Loading training tracker…" className="h-[60vh]" />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Training Tracker</h1>
          <p className="mt-1 text-sm text-ink-secondary">Manage the curriculum and track candidate status.</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4" /> Add course
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-md border border-hairline bg-white p-1">
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

        <Select value={candidateFilter} onValueChange={setCandidateFilter}>
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All candidates</SelectItem>
            {candidates.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <CourseTable
        courses={filteredCourses}
        candidates={candidates}
        progress={progress}
        candidateId={candidateFilter}
        onEdit={handleEdit}
        onDelete={setDeletingCourse}
        onStatusChange={handleStatusChange}
        onDateChange={handleDateChange}
      />

      <CourseFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        course={editingCourse}
        onSubmit={handleFormSubmit}
        isLoading={createCourse.isPending || updateCourse.isPending}
      />

      <ConfirmDialog
        open={!!deletingCourse}
        onOpenChange={(open) => !open && setDeletingCourse(null)}
        title="Delete this course?"
        description={`"${deletingCourse?.name}" and all associated progress records will be permanently removed.`}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteCourse.isPending}
      />
    </div>
  );
}
