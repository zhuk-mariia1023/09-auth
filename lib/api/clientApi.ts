'use client';

import { nextApi } from './api';
import type { Note, NewNote } from '@/types/note';
import type { User, RegisterRequest, LoginRequest } from '@/types/user';

// Створення нотатки (для клієнта)
export const createNote = async (data: NewNote): Promise<Note> => {
  const response = await nextApi.post<Note>('/notes', data);
  return response.data;
};

// Видалення нотатки (для клієнта)
export const deleteNote = async (id: number): Promise<Note> => {
  const response = await nextApi.delete<Note>(`/notes/${id}`);
  return response.data;
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

type CheckSessionResponse = {
  success: boolean;
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
