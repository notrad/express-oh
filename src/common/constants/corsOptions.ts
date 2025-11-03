import type { CorsOptions } from "cors";

const allowedMethods: string[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
];
const allowedHeaders: string[] = [
  "Origin",
  "X-Requested-With",
  "Content-Type",
  "Accept",
  "Authorization",
  "X-Access-Token",
];

export const devCorsOptions: CorsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  optionsSuccessStatus: 200,
  methods: allowedMethods,
  allowedHeaders: allowedHeaders,
};
