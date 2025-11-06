import { getDatabase } from "../common/utils/bootstrap";
import { UserRepository } from "../repositories/userRepository";
import type { User } from "../types/User";

const userRepository = () => UserRepository.getInstance(getDatabase());

export const findUserById = async (id: string): Promise<User | undefined> => {
  return await userRepository().findById(id);
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  return await userRepository().create(user);
};

export const updateUser = async (
  id: string,
  user: Partial<User>,
): Promise<User | undefined> => {
  return await userRepository().update(id, user);
};

export const deleteUser = async (id: string): Promise<void> => {
  await userRepository().delete(id);
};

export const findUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  return await userRepository().findByEmail(email);
};
