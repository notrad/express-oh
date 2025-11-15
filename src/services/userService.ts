import { authConfig } from "../config/authConfig";
import type { User, UserEntity } from "../types/User";
import bcrypt from "bcrypt";
import { prisma } from "../prisma/prismaClient";

export const findUserById = async (id: string): Promise<UserEntity | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = async (
  user: Omit<User, "id">,
): Promise<UserEntity | null> => {
  const passwordHash = await hashPassword(user.password);
  return prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      passwordHash,
      roles: user.roles,
    },
  });
};

export const updateUser = async (
  id: string,
  user: Partial<User>,
): Promise<UserEntity | null> => {
  let passwordHash;
  if (user.password) {
    passwordHash = await hashPassword(user.password);
  }

  return prisma.user.update({
    where: { id },
    data: {
      name: user.name,
      email: user.email,
      passwordHash: passwordHash,
      roles: user.roles,
    },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  await prisma.user.delete({ where: { id } });
};

export const findUserByEmail = async (
  email: string,
): Promise<UserEntity | null> => {
  return prisma.user.findUnique({ where: { email } });
};

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, authConfig.passwordHash.saltRounds);
};
