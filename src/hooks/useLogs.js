import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '@/mocks/mockApi';

export function useActivityFeed() {
  return useQuery({ queryKey: ['logs', 'feed'], queryFn: api.getLogs });
}

export function useCandidateLogs(candidateId) {
  return useQuery({
    queryKey: ['logs', 'candidate', candidateId],
    queryFn: () => api.getLogsByCandidate(candidateId),
    enabled: !!candidateId,
  });
}

export function useCreateLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createLog,
    onSuccess: (log) => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
