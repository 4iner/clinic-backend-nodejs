export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  username: string;
  token: string;
}

export interface ErrorResponse {
  message: string;
} 