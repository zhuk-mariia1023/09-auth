import { cookies } from 'next/headers';
import { nextApi } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

// Helper to get cookies for SSR requests
const getSSRHeaders = async () => {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

// SSR: Get authenticated user
export const getServerMe = async (): Promise<User> => {
  const headers = await getSSRHeaders();
  const response = await nextApi.get<User>('/users/me', headers);
  return response.data;
};

// SSR: Check user session (used in middleware)
export const checkServerSession = async () => {
  const headers = await getSSRHeaders();
  const response = await nextApi.get('/auth/session', headers);
  return response;
};

// SSR: Fetch all notes with optional filters
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

// SSR: Fetch single note by ID
export const fetchNoteByIdSSR = async (id: string): Promise<Note> => {
  const headers = await getSSRHeaders();
  const response = await nextApi.get<Note>(`/notes/${id}`, headers);
  return response.data;
};
