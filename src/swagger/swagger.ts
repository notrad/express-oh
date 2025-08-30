import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express TS API",
      version: "1.0.0",
    },
    server: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["src/routes/**/*.ts", "src/app.ts"],
});
