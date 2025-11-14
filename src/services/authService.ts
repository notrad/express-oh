import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authConfig } from "../config/authConfig";
import type { JwtPayload, LoginDto, LoginResponse } from "../types/Auth";
import type { User, UserEntity } from "../types/User";
import { prisma } from "../prisma/prismaClient";

const generateToken = async (
  payload: Omit<JwtPayload, "iat" | "exp">,
): Promise<string> => {
  return jwt.sign(payload, Buffer.from(authConfig.jwt.secret, "utf-8"), {
    expiresIn: authConfig.jwt.expiresIn,
  } as SignOptions);
};

export const verifyToken = async (token: string): Promise<JwtPayload> => {
  return jwt.verify(token, authConfig.jwt.secret) as JwtPayload;
};

const comparePasswords = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword);
};

export const login = async (credentials: LoginDto): Promise<LoginResponse> => {
  const fetchedUser = await findUserByEmail(credentials.email);

  if (
    credentials.email !== fetchedUser?.email ||
    !(await comparePasswords(credentials.password, fetchedUser.passwordHash))
  ) {
    throw new Error("Invalid credentials");
  }

  const payload: JwtPayload = {
    userId: fetchedUser.id,
    email: fetchedUser.email,
    roles: fetchedUser.roles,
  };

  const token = await generateToken(payload);

  return {
    token,
    user: {
      id: fetchedUser.id,
      email: fetchedUser.email,
      roles: fetchedUser.roles,
    },
  };
};

const findUserByEmail = async (email: string): Promise<UserEntity | null> => {
  return prisma.user.findUnique({where: {email}})
};
