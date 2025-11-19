import type { Db } from "mongodb";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGO_DB || "express-oh";

let client: MongoClient;
let db: Db;

export const connectDb = async (): Promise<Db> => {
  if (!client) {
    client = new MongoClient(URI);
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  }

  return db;
};

export const getDb = async (): Promise<Db> => {
  if (!db) throw new Error("Database not connected");
  return db;
};
