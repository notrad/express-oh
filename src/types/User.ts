export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createAt: Date;
  updateAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
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
