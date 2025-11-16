import { ObjectId } from "mongodb";
import { getDb } from "../mongodb/mongoClient";
import type { CreateUserDto, UpdateUserDto } from "../types/User";

export const findUserById = async (id: string) => {
  const db = await getDb();
  return db.collection("users").findOne({ _id: new ObjectId(id) });
};
