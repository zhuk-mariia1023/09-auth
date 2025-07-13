import { cookies } from 'next/headers';
import { nextApi } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

type ServerNotesResponse = {
  notes: Note[];
  totalPages: number;
};

// Отримання списку нотаток з авторизацією (SSR)
export const fetchNotesServer = async (
  page: number,
  search = '',
  tag?: string,
  perPage = 12
): Promise<ServerNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim()) params.search = search.trim();
  if (tag && tag !== 'all') params.tag = tag;

  const cookieStore = cookies();
  const response = await nextApi.get<ServerNotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

// Отримання окремої нотатки по ID (SSR)
export const fetchNoteByIdServer = async (id: number): Promise<Note> => {
  const cookieStore = cookies();
  const response = await nextApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

// Отримання профілю користувача (SSR)
export const getServerMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const { data } = await nextApi.get('/users/me', {
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
