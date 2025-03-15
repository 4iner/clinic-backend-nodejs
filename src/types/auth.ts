export interface User {
  id: number;
  username: string;
  password: string;
  roles: Role[];
}

export enum Role {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
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