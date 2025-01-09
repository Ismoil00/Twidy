import pkg, { PoolClient, QueryResult } from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();

if (
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_HOST ||
  !process.env.DB_NAME ||
  !process.env.DB_PORT
) {
  throw new Error("Missing database configuration in environment variables");
}

// pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  max: 20,
  idleTimeoutMillis: 300000,
  connectionTimeoutMillis: 2000,
});

// client connection
export const query = async (text: string, params?: any[]): Promise<any> => {
  const client: PoolClient = await pool.connect();
  console.log("Client connected to the database");

  try {
    const result: QueryResult<any> = await client.query(text, params);
    // console.log("DB Result: ", result);

    if (result.rowCount === 0) return null;
    else return result.rows[0]["response"];
  } catch (error) {
    console.log("Databse query ERROR: ", error);
    throw error;
  } finally {
    client.release();
    console.log("Client released from the database");
  }
};

// database connection shutdown
export const closePool = async (): Promise<void> => {
  try {
    await pool.end();
    console.log("Database connection pool closed");
  } catch (error) {
    console.error("Error closing the database connection pool:", error);
  }
};

/* ____________________________ CLOSING CONNECTION IN CASE OF CRASHES ____________________________ */
// Graceful shutdown logic
const gracefullyShutdown = async (event: string): Promise<void> => {
  try {
    console.log(`Received ${event}. Shutting down...`);
    await closePool();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};
process.on("SIGINT", async () => await gracefullyShutdown("SIGINT"));
process.on("SIGTERM", async () => await gracefullyShutdown("SIGTERM"));

// Handle uncaught exceptions (optional)
process.on("uncaughtException", async (error: Error) => {
  console.error("Uncaught exception:", error);
  await closePool();
  process.exit(1);
});

// Handle unhandled promise rejections (optional)
process.on(
  "unhandledRejection",
  async (reason: unknown, promise: Promise<unknown>) => {
    console.error("Unhandled rejection at:", promise, "reason:", reason);
    await closePool();
    process.exit(1);
  }
);
