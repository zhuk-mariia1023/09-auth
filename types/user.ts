export interface User {
  username: string;
  email: string;
  avatar: string;
}

export interface AuthUserData {
  username: string;
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};
