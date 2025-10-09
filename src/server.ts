import createApp from "./app";
import { appConfig, validateConfig } from "./config/config";
import { getDatabase, initializeDatabase } from "./common/utils/bootstrap";

const startServer = async () => {
  try {
    validateConfig();

    await initializeDatabase();

    const app = createApp();

    app.listen(appConfig.port, () => {
      console.log(`Server is running on port ${appConfig.port}`);
      console.log(`Environment: ${appConfig.nodeEnv}`);
      console.log(
        `Documentations available at: http://localhost:${appConfig.port}/api-docs`,
      );
    });

    const gracefulShutdown = async () => {
      const db = getDatabase();
      await db.disconnect();
      process.exit(0);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
