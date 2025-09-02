import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  apiPrefix: "/",
} as const;

export const validateConfig = () => {
  if (!process.env.PORT) {
    throw new Error("PORT is required");
  }
};
