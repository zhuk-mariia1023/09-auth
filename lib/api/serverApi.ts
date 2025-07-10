import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// Перевірка сесії
export const getSession = async (): Promise<User | null> => {
  const res = await fetch(`${BASE_URL}/auth/session`, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
};

// Отримати поточний профіль
export const getUserProfile = async (): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch user profile');
  return res.json();
};

// Отримати одну нотатку
export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
};

// Отримати список нотаток
export const fetchNotes = async (
  page: number,
  search = '',
  tag?: string,
  perPage = 12
): Promise<{ notes: Note[]; totalPages: number }> => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (search.trim()) params.set('search', search.trim());
  if (tag && tag !== 'all') params.set('tag', tag);

  const res = await fetch(`${BASE_URL}/notes?${params.toString()}`, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
};
