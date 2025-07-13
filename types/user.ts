export interface User {
  username: string;
  email: string;
  avatar: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};
