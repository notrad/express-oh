import type { PoolConfig } from "pg";
import { Pool } from "pg";
import type { Database } from "./interfaces/Database";
import type { DbConfig } from "../types/DbConfig";

export class PostgresDatabase implements Database {
  private pool: Pool | null = null;

  constructor(private config: DbConfig) {}

  async connect(): Promise<void> {
    const poolConfig: PoolConfig = {
      host: this.config.host,
      port: this.config.port,
      user: this.config.username,
      password: this.config.password,
      database: this.config.database,
      ssl: this.config.ssl,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };

    this.pool = new Pool(poolConfig);

    try {
      const client = await this.pool.connect();
      client.release();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }

  async query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
    if (!this.pool) {
      throw new Error("Database not connected");
    }

    const { rows } = await this.pool.query(sql, params);

    return rows as T[];
  }

  async execute(sql: string, params?: unknown[]): Promise<void> {
    if (!this.pool) {
      throw new Error("Database not connected");
    }

    await this.pool.query(sql, params);
  }
}
