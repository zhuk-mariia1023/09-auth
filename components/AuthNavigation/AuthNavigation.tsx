'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { apiLogout } from '@/lib/api/clientApi';

const AuthNavigation = () => {
  const router = useRouter();

  const { isAuthenticated } = useAuthStore();

  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    try {
      await apiLogout();
      clearIsAuthenticated();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          <li>
            <Link href="/sign-up">Register</Link>
          </li>
          <li>
            <Link href="/sign-in">Login</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
