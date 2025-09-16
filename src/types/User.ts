import type { Request } from "express";

export interface User {
  id: string;
  name: string;
  email: string;
  createAt: Date;
  updateAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
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

export interface RequestWithUser extends Request {
  body: CreateUserDto | UpdateUserDto;
  user?: User;
}
