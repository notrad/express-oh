export interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
    free: number;
  };
  version: string;
}

export interface ServiceHealth {
  status: "up" | "down";
  latency: number;
}
