import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authConfig } from "../config/authConfig";
import type { JwtPayload, LoginDto, LoginResponse } from "../types/Auth";

export const generateToken = async (
  payload: Omit<JwtPayload, "iat" | "exp">,
): Promise<string> => {
  return jwt.sign(payload, Buffer.from(authConfig.jwt.secret, "utf-8"), {
    expiresIn: authConfig.jwt.expiresIn,
  } as SignOptions);
};

export const verifyToken = async (token: string): Promise<JwtPayload> => {
  return jwt.verify(token, authConfig.jwt.secret) as JwtPayload;
};

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, authConfig.passwordHash.saltRounds);
};

export const comparePasswords = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword);
};

export const login = async (credentials: LoginDto): Promise<LoginResponse> => {
  // TODO: Replace with actual user lookup from database
  const mockUser = {
    id: "1",
    email: "admin@example.com",
    password: await hashPassword("admin123"),
    roles: ["admin"] as const,
  };

  if (
    credentials.email !== mockUser.email ||
    !(await comparePasswords(credentials.password, mockUser.password))
  ) {
    throw new Error("Invalid credentials");
  }

  const payload: JwtPayload = {
    userId: mockUser.id,
    email: mockUser.email,
    roles: mockUser.roles,
  };

  const token = await generateToken(payload);

  return {
    token,
    user: {
      id: mockUser.id,
      email: mockUser.email,
      roles: mockUser.roles,
    },
  };
};
