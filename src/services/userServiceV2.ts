import { ObjectId } from "mongodb";
import { getDb } from "../mongodb/mongoClient";
import type { CreateUserDto, UpdateUserDto } from "../types/User";

export const findUserById = async (id: string) => {
  const db = await getDb();
  return db.collection("users").findOne({ _id: new ObjectId(id) });
};

export const createUser = async (user: CreateUserDto) => {
  const db = await getDb();
  const result = await db.collection("users").insertOne(user);
  return { ...user, _id: result.insertedId };
};

export const updateUser = async (id: string, user: UpdateUserDto) => {
  const db = await getDb();
  const result = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: user });
  return { ...user, _id: result.upsertedId };
};

export const deleteUser = async (id: string) => {
  const db = await getDb();
  const results = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });
  return results.acknowledged;
};
