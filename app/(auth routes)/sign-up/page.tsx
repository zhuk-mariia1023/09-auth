'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { registerUser } from '@/lib/api/clientApi';
import css from './SignUp.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    setError('');

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await registerUser({ username, email, password });
      router.push('/profile');
    } catch (e) {
      setError('Registration failed');
    }
  }

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <label className={css.formGroup}>
          Username
          <input type="text" name="username" required className={css.input} />
        </label>

        <label className={css.formGroup}>
          Email
          <input type="email" name="email" required className={css.input} />
        </label>

        <label className={css.formGroup}>
          Password
          <input
            type="password"
            name="password"
            required
            className={css.input}
          />
        </label>

        <button type="submit" className={css.submitButton}>
          Register
        </button>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
