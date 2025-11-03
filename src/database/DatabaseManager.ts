import type { Database } from "./interfaces/Database";
import type { DbConfig } from "../types/DbConfig";
import { databaseFactory } from "./DatabaseFactory";
import type { DbType } from "./DatabaseFactory";

export class DatabaseManager {
  private static instance: DatabaseManager;
  private database: Database | null = null;

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }

    return DatabaseManager.instance;
  }

  public async initialize(type: DbType, config: DbConfig): Promise<void> {
    if (this.database) {
      throw new Error("Database already initialized");
    }

    this.database = databaseFactory(type, config);
    await this.database.connect();
  }

  public getDatabase(): Database {
    if (!this.database) {
      throw new Error("Database not initialized");
    }

    return this.database;
  }

  public async disconnect(): Promise<void> {
    if (this.database) {
      await this.database.disconnect();
      this.database = null;
    }
  }
}
