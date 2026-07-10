import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/shared/Sidebar';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar role="admin" />
      <main className="flex-1 overflow-y-auto px-8 py-7">
        <Outlet />
      </main>
    </div>
  );
}
