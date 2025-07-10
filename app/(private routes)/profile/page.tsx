import type { Metadata } from 'next';
import css from './ProfilePage.module.css';
import { useAuthStore } from '@/store/authStore';

export const metadata: Metadata = {
  title: 'User Profile | NoteHub',
  description: 'View and edit your profile on NoteHub.',
  openGraph: {
    title: 'User Profile | NoteHub',
    description: 'Access your NoteHub user profile and manage your data.',
    type: 'website',
    url: 'https://your-site-url.com/profile',
    images: [
      {
        url: 'https://your-site-url.com/og-image-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'User Profile',
      },
    ],
  },
};

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>

        <div className={css.avatarWrapper}>
          <img
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username || 'your_username'}</p>
          <p>Email: {user?.email || 'your_email@example.com'}</p>
        </div>
      </div>
    </main>
  );
}
