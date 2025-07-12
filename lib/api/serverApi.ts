import { cookies } from 'next/headers';
import { nextApi } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

// Отримання списку нотаток (SSR)
export const fetchNotes = async (
  cookie: string,
  page: number,
  search = '',
  tag?: string,
  perPage = 12
): Promise<{ notes: Note[]; totalPages: number }> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim()) params.search = search.trim();
  if (tag && tag !== 'all') params.tag = tag;

  const response = await nextApi.get<{ notes: Note[]; totalPages: number }>(
    '/notes',
    {
      params,
      headers: { Cookie: cookie },
    }
  );

  return response.data;
};

// Отримання однієї нотатки (SSR)
export const fetchNoteById = async (
  id: number,
  cookie: string
): Promise<Note> => {
  const response = await nextApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookie },
  });
  return response.data;
};

// Отримання профілю користувача (SSR)
export const getServerMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const { data } = await nextApi.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// Оновлення профілю користувача (SSR)
export const updateUser = async (
  cookie: string,
  data: Partial<User>
): Promise<User> => {
  const response = await nextApi.patch<User>('/users/me', data, {
    headers: { Cookie: cookie },
  });
  return response.data;
};

// Серверна перевірка сесії
export const checkServerSession = async () => {
  const cookieStore = cookies();
  const response = await nextApi.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};
