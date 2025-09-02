import createApp from "./app";
import { config, validateConfig } from "./config/config";

const startServer = async () => {
  try {
    validateConfig();
    const app = createApp();

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(
        `Documentations available at: http://localhost:${config.port}/api-docs`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
