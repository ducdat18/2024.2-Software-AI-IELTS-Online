'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole: string | string[];
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  requiredRole,
  redirectTo = '/auth/login',
}: AuthGuardProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const userJson = localStorage.getItem('user');

      if (!userJson) {
        router.push(redirectTo);
        return;
      }

      try {
        const user = JSON.parse(userJson);
        const userRole = user.role;
        const hasRequiredRole = Array.isArray(requiredRole)
          ? requiredRole.includes(userRole)
          : userRole === requiredRole;

        if (!hasRequiredRole) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push(redirectTo);
      }
    };

    checkAuth();
  }, [router, requiredRole, redirectTo]);

  return <>{children}</>;
}
