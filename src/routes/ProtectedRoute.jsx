import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from '@/components/shared/misc';

/**
 * Guards a route subtree by authentication and (optionally) role.
 * Unauthenticated users are sent to /login. Authenticated users hitting the
 * wrong role's section are redirected to their own home.
 */
export function ProtectedRoute({ role }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader label="Checking your session…" className="h-screen" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === 'admin' && !isAdmin) {
    return <Navigate to="/candidate/tasks" replace />;
  }

  if (role === 'candidate' && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
