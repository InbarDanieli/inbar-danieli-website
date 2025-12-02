import session from "express-session";
import MongoDBStoreFactory from "connect-mongodb-session";

// Define custom session data type (our application-specific session data)
export interface UserSessionData {
  userId: string;
  email: string;
}

// Create the MongoDBStore class
const MongoDBStore = MongoDBStoreFactory(session);

// Initialize the store with MongoDB connection
export const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/inbar-danieli",
  databaseName: "crochet_db",
  collection: "sessions", // This is where sessions will be stored
  expires: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
});

// Error handling for the store
sessionStore.on("error", (error) => {
  console.error("Session store error:", error);
});

// Promisified methods to interact with the store

/**
 * Get a session from MongoDB by session ID
 * @param sessionId - The unique session identifier
 * @returns Session data or null if not found/expired
 */
export function getSessionFromStore(
  sessionId: string
): Promise<UserSessionData | null> {
  return new Promise((resolve, reject) => {
    sessionStore.get(sessionId, (error, sessionData) => {
      if (error) {
        reject(error);
      } else {
        resolve((sessionData as unknown as UserSessionData) || null);
      }
    });
  });
}

/**
 * Save a session to MongoDB
 * @param sessionId - The unique session identifier
 * @param sessionData - The data to store in the session
 */
export function setSessionInStore(
  sessionId: string,
  sessionData: UserSessionData
): Promise<void> {
  return new Promise((resolve, reject) => {
    sessionStore.set(
      sessionId,
      sessionData as unknown as session.SessionData,
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

/**
 * Delete a session from MongoDB
 * @param sessionId - The unique session identifier
 */
export function destroySessionInStore(sessionId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    sessionStore.destroy(sessionId, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Get all sessions from MongoDB (useful for debugging)
 */
export function getAllSessions(): Promise<UserSessionData[]> {
  return new Promise((resolve, reject) => {
    sessionStore.all((error, sessions) => {
      if (error) {
        reject(error);
      } else {
        // sessions can be either an array or object, normalize to array
        const sessionArray = Array.isArray(sessions)
          ? sessions
          : sessions
          ? Object.values(sessions)
          : [];
        resolve(sessionArray as unknown as UserSessionData[]);
      }
    });
  });
}
