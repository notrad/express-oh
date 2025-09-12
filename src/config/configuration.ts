import dotenv from "dotenv";
import type { AppConfig, NodeEnv } from "../types/AppConfig";

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

function getNodeEnv(): NodeEnv {
  const env = process.env.NODE_ENV;
  if (env === "development" || env === "production" || env === "test") {
    return env;
  }
  return "development";
}

export const validateConfig = (): void => {
  const requiredEnvVars = ["PORT", "NODE_ENV"];
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar],
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`,
    );
  }
};
