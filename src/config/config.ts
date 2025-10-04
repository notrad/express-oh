import dotenv from "dotenv";
import type { AppConfig, NodeEnv } from "../types/AppConfig";
import type { DbConfig } from "../types/DbConfig";

dotenv.config();

export const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: getNodeEnv(),
  corsOrigin: process.env.CORS_ORIGIN || "*",
  apiPrefix: "/",
  viewEngine: {
    engine: "pug",
    viewsDir: "views",
  },
  staticFiles: {
    route: "/static",
    dir: "public",
  },
};

export const dbConfig: DbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "express_oh",
  ssl: process.env.DB_SSL === "true",
};

function getNodeEnv(): NodeEnv {
  const env = process.env.NODE_ENV;
  if (env === "development" || env === "production" || env === "test") {
    return env;
  }
  return "development";
}

export const validateConfig = (): void => {
  const requiredEnvVars = [
    "PORT",
    "NODE_ENV",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "JWT_REFRESH_EXPIRES_IN",
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
  ];
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar],
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`,
    );
  }
};
