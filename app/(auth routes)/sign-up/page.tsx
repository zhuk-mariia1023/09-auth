'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { apiRegister } from '@/lib/api/clientApi';
import type { RegisterRequest } from '@/types/user';
import css from './SignUpPage.module.css';

const SignUpPage = () => {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const payload: RegisterRequest = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      const user = await apiRegister(payload);
      if (user) {
        setUser(user);
        router.push('/profile');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
