'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthStore } from '@/lib/store/authStore';
import { editUser } from '@/lib/api/clientApi';
import type { AuthUserData } from '@/types/user';

import css from './EditProfilePage.module.css';

const EditProfilePage = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const username = String(formData.get('username')).trim();

    if (!username) {
      setError('Username is required');
      return;
    }

    if (user) {
      const updatedUser: AuthUserData = {
        username,
        email: user.email,
      };

      try {
        const response = await editUser(updatedUser);
        setUser(response);
        router.push('/profile');
      } catch (err) {
        console.error('Error updating profile:', err);
        setError('Failed to update profile. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              defaultValue={user.username}
              className={css.input}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>

        {error && <p className={css.error}>{error}</p>}
      </div>
    </main>
  );
};

export default EditProfilePage;
