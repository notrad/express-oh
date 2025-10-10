import { getDatabase } from "../common/utils/bootstrap";
import type { User } from "../types/User";

export const findUserById = async (id: string) => {
  const db = getDatabase();

  const users = await db.query<User>("SELECT * FROM users WHERE id = $1", [id]);

  return users[0];
};
