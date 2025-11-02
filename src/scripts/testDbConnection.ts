import { initializeDatabase } from "../common/utils/bootstrap";

async function testConnection() {
  try {
    const db = await initializeDatabase();
    console.log("Successfully connected to the database");
    await db.disconnect();
  } catch (error) {
    console.error("Connection test failed:", error);
  }
}

testConnection();
