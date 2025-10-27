import createApp from "./app";
import { appConfig, validateConfig } from "./config/config";
import { initializeDatabase, gracefulShutdown } from "./common/utils/bootstrap";

const startServer = async () => {
  try {
    validateConfig();

    await initializeDatabase();

    const app = createApp();

    const server = app.listen(appConfig.port, () => {
      console.log(`Server is running on port ${appConfig.port}`);
      console.log(`Environment: ${appConfig.nodeEnv}`);
      console.log(
        `Documentations available at: http://localhost:${appConfig.port}/api-docs`,
      );
    });

    process.on("SIGTERM", async () => {
      await gracefulShutdown();
      server.close(() => process.exit(0));
    });

    process.on("SIGINT", async () => {
      await gracefulShutdown();
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
