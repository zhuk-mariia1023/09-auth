import type { Metadata } from 'next';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';

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
        url: '/default-avatar.png',
        width: 1200,
        height: 630,
        alt: 'User Profile',
      },
    ],
  },
};

const ProfilePage = async () => {
  const user = await getServerMe();

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
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
