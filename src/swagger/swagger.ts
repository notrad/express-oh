import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express, Oh! API Documentation",
      version: "1.0.0",
      description: "API documentation for Express, Oh! application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Enter your Bearer token in the format **Bearer <token>**",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "The user's unique identifier",
            },
            name: {
              type: "string",
              description: "The name of the user",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email address of the user",
            },
          },
          required: ["name", "email"],
        },
        Error: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "error",
            },
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["src/routes/**/*.ts"],
});
