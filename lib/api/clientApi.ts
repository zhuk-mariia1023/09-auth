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

// Fetch all notes with optional search and tag filters
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

// Fetch a single note by ID
export const fetchNoteById = async (id: string) => {
  const { data } = await nextApi.get<Note>(`/notes/${id}`);
  return data;
};

// Create a new note
export const createNote = async (data: NewNote): Promise<Note> => {
  const response = await nextApi.post<Note>('/notes', data);
  return response.data;
};

// Delete a note by ID
export const deleteNote = async (id: number): Promise<Note> => {
  const response = await nextApi.delete<Note>(`/notes/${id}`);
  return response.data;
};

// Check user session
export const checkSession = async () => {
  const response = await nextApi.get<CheckSessionResponse>('/auth/session');
  return response;
};

// Get authenticated user
export const getMe = async (): Promise<User> => {
  const response = await nextApi.get<User>('/users/me');
  return response.data;
};

// Logout user
export const apiLogout = async (): Promise<void> => {
  await nextApi.post('/auth/logout');
};

// Register new user
export const apiRegister = async (data: RegisterRequest): Promise<User> => {
  const response = await nextApi.post<User>('/auth/register', data);
  return response.data;
};

// Login user
export const apiLogin = async (data: LoginRequest): Promise<User> => {
  const response = await nextApi.post<User>('/auth/login', data);
  return response.data;
};

// Edit authenticated user's profile
export const editUser = async (user: AuthUserData): Promise<User> => {
  const response = await nextApi.patch<User>('/users/me', user);
  return response.data;
};
