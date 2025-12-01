import type { ObjectId } from "mongodb";
import { db } from "@/lib/db";

export interface LogEntry {
  _id?: ObjectId;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  context?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

const LOG_COLLECTION = "logs";

export const LogCollection = () => db.collection<LogEntry>(LOG_COLLECTION);

export async function createLog(
  entry: Omit<LogEntry, "_id" | "timestamp">,
): Promise<void> {
  try {
    const logEntry: LogEntry = {
      ...entry,
      timestamp: new Date(),
    };

    await LogCollection().insertOne(logEntry);
  } catch (error) {
    // Fallback to console if database logging fails
    console.error("Failed to write log to database:", error);
    console.log(
      `[${entry.level.toUpperCase()}] ${entry.context ? `[${entry.context}] ` : ""}${entry.message}`,
      entry.metadata || "",
    );
  }
}

export async function logInfo(
  message: string,
  context?: string,
  userId?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  await createLog({
    level: "info",
    message,
    context,
    userId,
    metadata,
  });
}

export async function logError(
  message: string,
  context?: string,
  userId?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  await createLog({
    level: "error",
    message,
    context,
    userId,
    metadata,
  });
}

export async function logWarn(
  message: string,
  context?: string,
  userId?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  await createLog({
    level: "warn",
    message,
    context,
    userId,
    metadata,
  });
}

export async function logDebug(
  message: string,
  context?: string,
  userId?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  await createLog({
    level: "debug",
    message,
    context,
    userId,
    metadata,
  });
}

// Cleanup old logs (older than 30 days)
export async function cleanupOldLogs(): Promise<number> {
  try {
    const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const result = await LogCollection().deleteMany({
      timestamp: { $lt: cutoffDate },
    });
    return result.deletedCount;
  } catch (error) {
    console.error("Error cleaning up old logs:", error);
    return 0;
  }
}

// Get logs for a specific user or context
export async function getLogs(
  filter: {
    limit?: number;
    skip?: number;
  } & Partial<LogEntry>,
): Promise<LogEntry[]> {
  try {
    const query: Partial<LogEntry> = {};

    if (filter.userId) query.userId = filter.userId;
    if (filter.context) query.context = filter.context;
    if (filter.level) query.level = filter.level;

    const logs = await LogCollection()
      .find(query)
      .sort({ timestamp: -1 })
      .limit(filter.limit || 100)
      .skip(filter.skip || 0)
      .toArray();

    return logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
}
