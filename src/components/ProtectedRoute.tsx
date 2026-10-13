import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLoginView } from '../views/admin/AdminLoginView';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001E2B] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#70ba65] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AdminLoginView />;
  }

  return <>{children}</>;
};
