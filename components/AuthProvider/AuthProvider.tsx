'use client';

import { useEffect, useState } from 'react';
import { checkSession, getMe } from '@/lib/api';
import { useAuthStore } from '@/lib/store/authStore';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const isValid = await checkSession();
        if (isValid) {
          const user = await getMe();
          if (user) setUser(user);
        } else {
          clearIsAuthenticated();

          if (pathname?.startsWith('/profile')) {
            router.push('/sign-in');
          }
        }
      } catch (err) {
        console.error('AuthProvider error:', err);
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated, pathname, router]);

  if (loading) return <p>Loading...</p>;

  return children;
};

export default AuthProvider;
