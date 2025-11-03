import {
  gracefulShutdown,
  initializeDatabase,
} from "../common/utils/bootstrap";

async function testConnection() {
  try {
    await initializeDatabase();
    console.log("Successfully connected to the database");
    await gracefulShutdown();
  } catch (error) {
    console.error("Connection test failed:", error);
  }
}

testConnection();
