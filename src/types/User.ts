import type { UserRole } from "./Auth";

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  roles: UserRole[];
  createAt: Date;
  updateAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password_hash: string;
  roles: UserRole[];
  createAt: Date;
  updateAt: Date;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}
