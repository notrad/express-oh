import { z } from "zod";

const dbConfigSchema = z.object({
  host: z.string(),
  port: z.number(),
  username: z.string(),
  password: z.string(),
  database: z.string(),
  ssl: z.boolean().optional(),
});

export const getDatabaseConfig = () => {
  const config = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "express_oh",
    ssl: process.env.DB_SSL === "true",
  };

  return dbConfigSchema.parse(config);
};
