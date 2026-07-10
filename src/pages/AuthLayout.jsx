import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <Outlet />
    </div>
  );
}
