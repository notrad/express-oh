export interface JwtPayload {
  userId: string;
  email: string;
  roles: UserRole[];
  iat?: number;
  exp?: number;
}

export type UserRole = "admin" | "user";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    roles: UserRole[];
  };
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
