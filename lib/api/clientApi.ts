'use client';

import { nextApi } from './api';
import type { Note, NewNote } from '@/types/note';
import type {
  User,
  AuthUserData,
  RegisterRequest,
  LoginRequest,
} from '@/types/user';

type CheckSessionResponse = {
  success: boolean;
};

export const fetchNotes = async (
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
    { params }
  );
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await nextApi.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (data: NewNote): Promise<Note> => {
  const response = await nextApi.post<Note>('/notes', data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextApi.delete<Note>(`/notes/${id}`);
  return response.data;
};

// Перевірка сесії
export const checkSession = async (): Promise<boolean> => {
  const response = await nextApi.get<CheckSessionResponse>('/auth/session');
  return response.data.success;
};

// Отримання користувача
export const getMe = async (): Promise<User> => {
  const response = await nextApi.get<User>('/auth/me');
  return response.data;
};

// Логаут
export const apiLogout = async (): Promise<void> => {
  await nextApi.post('/auth/logout');
};

// Реєстрація
export const apiRegister = async (data: RegisterRequest): Promise<User> => {
  const response = await nextApi.post<User>('/auth/register', data);
  return response.data;
};

// Логін
export const apiLogin = async (data: LoginRequest): Promise<User> => {
  const response = await nextApi.post<User>('/auth/login', data);
  return response.data;
};

export const editUser = async (user: AuthUserData): Promise<User> => {
  const responce = await nextApi.patch<User>('/users/me', user);
  return responce.data;
};
