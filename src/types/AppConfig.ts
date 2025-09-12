export type NodeEnv = "development" | "production" | "test";

export interface AppConfig {
  port: number;
  nodeEnv: NodeEnv;
  corsOrigin: string;
  apiPrefix: string;
  viewEngine: {
    engine: string;
    viewsDir: string;
  };
  staticFiles: {
    route: string;
    dir: string;
  };
}
