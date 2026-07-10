import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { CandidateLayout } from '@/layouts/CandidateLayout';

import Login from '@/pages/auth/Login';
import Dashboard from '@/pages/admin/Dashboard';
import TrainingTracker from '@/pages/admin/TrainingTracker';
import Candidates from '@/pages/admin/Candidates';
import ActivityFeed from '@/pages/admin/ActivityFeed';
import MyTasks from '@/pages/candidate/MyTasks';
import DailyLog from '@/pages/candidate/DailyLog';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    element: <ProtectedRoute role="admin" />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin/dashboard', element: <Dashboard /> },
          { path: '/admin/tracker', element: <TrainingTracker /> },
          { path: '/admin/candidates', element: <Candidates /> },
          { path: '/admin/activity', element: <ActivityFeed /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute role="candidate" />,
    children: [
      {
        element: <CandidateLayout />,
        children: [
          { path: '/candidate/tasks', element: <MyTasks /> },
          { path: '/candidate/log', element: <DailyLog /> },
        ],
      },
    ],
  },
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '*', element: <Navigate to="/login" replace /> },
]);
