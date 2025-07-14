import { cookies } from 'next/headers';
import { nextApi } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

// Хелпер для headers з cookies
const getSSRHeaders = async () => {
  const cookieStore = await cookies(); // await тут обов’язковий
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

// SSR: Отримання користувача
export const getServerMe = async (): Promise<User> => {
  const headers = await getSSRHeaders(); // потрібно чекати
  const response = await nextApi.get<User>('/users/me', headers);
  return response.data;
};

// SSR: Оновлення користувача
export const updateUser = async (
  cookie: string,
  data: Partial<User>
): Promise<User> => {
  const response = await nextApi.patch<User>('/users/me', data, {
    headers: {
      Cookie: cookie,
    },
  });
  return response.data;
};

// SSR: Перевірка сесії
export const checkServerSession = async () => {
  const headers = await getSSRHeaders();
  const response = await nextApi.get('/auth/session', headers);
  return response;
};

// SSR: Отримати всі нотатки
export const fetchNotesSSR = async (
  page: number,
  search = '',
  tag?: string,
  perPage = 12
): Promise<{ notes: Note[]; totalPages: number }> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search.trim();
  if (tag && tag !== 'all') params.tag = tag;

  const headers = await getSSRHeaders();

  const response = await nextApi.get<{ notes: Note[]; totalPages: number }>(
    '/notes',
    {
      params,
      ...headers,
    }
  );
  return response.data;
};

// SSR: Отримати нотатку за ID
export const fetchNoteByIdSSR = async (id: number): Promise<Note> => {
  const headers = await getSSRHeaders();
  const response = await nextApi.get<Note>(`/notes/${id}`, headers);
  return response.data;
};
