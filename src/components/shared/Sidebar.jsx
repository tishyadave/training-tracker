import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ListChecks,
  Users,
  Activity,
  ClipboardList,
  NotebookPen,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const ADMIN_NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/tracker', label: 'Training Tracker', icon: ListChecks },
  { to: '/admin/candidates', label: 'Candidates', icon: Users },
  { to: '/admin/activity', label: 'Activity Feed', icon: Activity },
];

const CANDIDATE_NAV = [
  { to: '/candidate/tasks', label: 'My Tasks', icon: ClipboardList },
  { to: '/candidate/log', label: 'Daily Log', icon: NotebookPen },
];

export function Sidebar({ role = 'admin' }) {
  const { user, logout } = useAuth();
  const nav = role === 'admin' ? ADMIN_NAV : CANDIDATE_NAV;

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-hairline bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-forest text-white">
          <GraduationCap className="h-4.5 w-4.5" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-display text-sm font-semibold text-ink">Training Tracker</span>
          <span className="text-[11px] text-ink-tertiary">Power BI Programme</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-forest-soft text-forest-hover'
                  : 'text-ink-secondary hover:bg-canvas hover:text-ink'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-hairline p-3">
        <div className="flex items-center gap-2.5 rounded-md px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-soft text-sm font-semibold text-forest-hover">
            {user?.name?.charAt(0) ?? '?'}
          </div>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium text-ink">{user?.name}</span>
            <span className="truncate text-xs text-ink-tertiary">{user?.email}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-1 flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-ink-secondary transition-colors hover:bg-rose-soft hover:text-rose"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
