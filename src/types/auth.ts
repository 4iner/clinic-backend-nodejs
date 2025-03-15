export interface User {
  id: number;
  username: string;
  password: string;
  roles: Role[];
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
  id: number;
  username: string;
  jwtToken: string;
  roles: Role[];
}

export interface ErrorResponse {
  message: string;
} 