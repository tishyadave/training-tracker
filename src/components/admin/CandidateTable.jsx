import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/shared/Avatar';
import { ProgressBar, EmptyState } from '@/components/shared/misc';

export function CandidateTable({ candidates = [], progressByCandidate = {}, onEdit, onDelete }) {
  if (candidates.length === 0) {
    return <EmptyState title="No candidates yet" description="Add a candidate to enroll them in the programme." />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-hairline bg-white">
      <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="border-b border-hairline text-left text-xs font-medium uppercase tracking-wide text-ink-tertiary">
            <th className="px-4 py-3">Candidate</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => {
            const percent = progressByCandidate[candidate.id]?.percent ?? 0;
            return (
              <tr key={candidate.id} className="group border-b border-hairline last:border-0 hover:bg-canvas/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={candidate.name} colorIndex={candidate.colorIndex} size={30} />
                    <span className="font-medium text-ink">{candidate.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-secondary">{candidate.email}</td>
                <td className="px-4 py-3">
                  <ProgressBar percent={percent} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(candidate)} aria-label={`Edit ${candidate.name}`}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-rose-soft hover:text-rose"
                      onClick={() => onDelete(candidate)}
                      aria-label={`Delete ${candidate.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
