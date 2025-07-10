import { api } from './api';
import type { User } from '@/types/user';
import type { Note, NewNote } from '@/types/note';

interface RegisterCredentials {
  email: string;
  password: string;
}

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const { data } = await api.post('/users/signup', credentials);
  return data;
};

// Логін
export const loginUser = async (
  credentials: AuthCredentials
): Promise<User> => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

// Логаут
export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
};

// Створення нотатки
export const createNote = async (data: NewNote): Promise<Note> => {
  const res = await api.post('/notes', data);
  return res.data;
};

// Видалення нотатки
export const deleteNote = async (id: number): Promise<Note> => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
