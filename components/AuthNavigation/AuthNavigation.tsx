'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { apiLogout } from '@/lib/api';
import css from './AuthNavigation.module.css';

const AuthNavigation = () => {
  const router = useRouter();

  const { isAuthenticated, user } = useAuthStore();

  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    await apiLogout();

    clearIsAuthenticated();

    router.push('/sign-in');
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.username}</p>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
