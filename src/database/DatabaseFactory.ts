import type { Database } from "./interfaces/Database";
import { PostgresDatabase } from "./PostgresDatabase";
import type { DbConfig } from "../types/DbConfig";

export type DbType = "postgres" | "mysql" | "sqlite";

export const databaseFactory = (type: DbType, config: DbConfig): Database => {
  switch (type) {
    case "postgres":
      return new PostgresDatabase(config);
    default:
      throw new Error(`Unsupported database type: ${type}`);
  }
};
