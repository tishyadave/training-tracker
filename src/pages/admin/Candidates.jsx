import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/shared/misc';
import { CandidateTable } from '@/components/admin/CandidateTable';
import { CandidateFormDialog } from '@/components/admin/CandidateFormDialog';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useCandidates, useCreateCandidate, useUpdateCandidate, useDeleteCandidate } from '@/hooks/useCandidates';
import { useCourses } from '@/hooks/useCourses';
import { useProgress } from '@/hooks/useProgress';
import { summarizeCandidate } from '@/lib/progress';

export default function Candidates() {
  const { data: candidates = [], isLoading: candidatesLoading } = useCandidates();
  const { data: courses = [] } = useCourses();
  const { data: progress = [] } = useProgress();

  const createCandidate = useCreateCandidate();
  const updateCandidate = useUpdateCandidate();
  const deleteCandidate = useDeleteCandidate();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [deletingCandidate, setDeletingCandidate] = useState(null);

  if (candidatesLoading) return <Loader label="Loading candidates…" className="h-[60vh]" />;

  const progressByCandidate = {};
  candidates.forEach((c) => {
    progressByCandidate[c.id] = summarizeCandidate(progress, c.id, courses.length);
  });

  function handleAdd() {
    setEditingCandidate(null);
    setFormOpen(true);
  }

  function handleEdit(candidate) {
    setEditingCandidate(candidate);
    setFormOpen(true);
  }

  function handleFormSubmit(values) {
    if (editingCandidate) {
      updateCandidate.mutate({ id: editingCandidate.id, data: values }, { onSuccess: () => setFormOpen(false) });
    } else {
      createCandidate.mutate(values, { onSuccess: () => setFormOpen(false) });
    }
  }

  function handleDeleteConfirm() {
    deleteCandidate.mutate(deletingCandidate.id, { onSuccess: () => setDeletingCandidate(null) });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Candidates</h1>
          <p className="mt-1 text-sm text-ink-secondary">Enroll and manage everyone in the training programme.</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4" /> Add candidate
        </Button>
      </div>

      <CandidateTable
        candidates={candidates}
        progressByCandidate={progressByCandidate}
        onEdit={handleEdit}
        onDelete={setDeletingCandidate}
      />

      <CandidateFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        candidate={editingCandidate}
        onSubmit={handleFormSubmit}
        isLoading={createCandidate.isPending || updateCandidate.isPending}
      />

      <ConfirmDialog
        open={!!deletingCandidate}
        onOpenChange={(open) => !open && setDeletingCandidate(null)}
        title="Delete this candidate?"
        description={`"${deletingCandidate?.name}" and all their progress and log history will be permanently removed.`}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteCandidate.isPending}
      />
    </div>
  );
}
