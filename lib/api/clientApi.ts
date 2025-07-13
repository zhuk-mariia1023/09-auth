'use client';

import { nextApi } from './api';
import type { User, RegisterRequest, LoginRequest } from '@/types/user';

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
