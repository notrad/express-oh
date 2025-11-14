import createApp from "./app";
import { appConfig, validateConfig } from "./config/config";

const startServer = async () => {
  try {
    validateConfig();

    const app = createApp();

    const server = app.listen(appConfig.port, () => {
      console.log(`Server is running on port ${appConfig.port}`);
      console.log(`Environment: ${appConfig.nodeEnv}`);
      console.log(
        `Documentations available at: http://localhost:${appConfig.port}/api-docs`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
