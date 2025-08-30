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
  origin: ["http://locahost:3000"],
  optionsSuccessStatus: 200,
  methods: allowedMethods,
  allowedHeaders: allowedHeaders,
};

export const preProdCorsOptions: CorsOptions = {};

export const prodCorsOptions: CorsOptions = {};

export const readOnlyCorsOptions: CorsOptions = {
  methods: ["GET"],
};
