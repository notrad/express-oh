import type { UserRole } from "./Auth";
export interface UserEntity {
  id: string;
  name: string;
  email: string;
  roles: string[];
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
  createAt: Date;
  updateAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
  createAt: Date;
  updateAt: Date;
}
export interface UserResponse {
  id: string;
  name: string;
  email: string;
}
