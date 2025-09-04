export interface AppConfig {
  port: number;
  nodeEnv: "development" | "production" | "test";
  corsOrigin: string;
  apiPrefix: string;
}

export interface RateLimitConfig {
  windowMs: number;
  max: number;
}
