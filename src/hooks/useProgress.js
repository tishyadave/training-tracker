import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '@/mocks/mockApi';

export function useProgress(filters = {}) {
  return useQuery({
    queryKey: ['progress', filters],
    queryFn: () => api.getProgress(filters),
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.updateProgress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useDashboardStats() {
  return useQuery({ queryKey: ['dashboard', 'stats'], queryFn: api.getDashboardStats });
}

export function useProgressMatrix() {
  return useQuery({ queryKey: ['dashboard', 'matrix'], queryFn: api.getProgressMatrix });
}
