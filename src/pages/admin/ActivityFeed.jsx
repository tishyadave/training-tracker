import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ActivityFeedItem } from '@/components/admin/ActivityFeedItem';
import { EmptyState, Loader } from '@/components/shared/misc';
import { useActivityFeed } from '@/hooks/useLogs';
import { useCandidates } from '@/hooks/useCandidates';
import { useCourses } from '@/hooks/useCourses';

export default function ActivityFeed() {
  const { data: logs = [], isLoading: logsLoading } = useActivityFeed();
  const { data: candidates = [], isLoading: candidatesLoading } = useCandidates();
  const { data: courses = [], isLoading: coursesLoading } = useCourses();

  const isLoading = logsLoading || candidatesLoading || coursesLoading;

  if (isLoading) return <Loader label="Loading activity feed…" className="h-[60vh]" />;

  const candidatesById = Object.fromEntries(candidates.map((c) => [c.id, c]));
  const coursesById = Object.fromEntries(courses.map((c) => [c.id, c]));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Activity Feed</h1>
        <p className="mt-1 text-sm text-ink-secondary">Every daily log submitted across the cohort, newest first.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>{logs.length} log{logs.length === 1 ? '' : 's'} total</CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <EmptyState title="No activity logged yet" description="Candidate daily logs will appear here as they're submitted." />
          ) : (
            <div>
              {logs.map((log) => (
                <ActivityFeedItem
                  key={log.id}
                  log={log}
                  candidate={candidatesById[log.candidateId]}
                  course={coursesById[log.courseId]}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
