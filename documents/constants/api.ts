export const API_CONFIG = {
  BASE_URL: "http://localhost:8080",
  WS_URL: "ws://localhost:8080",
  ENDPOINTS: {
    DOCUMENTS: "/documents",
    CREATE_DOCUMENT: "/documents",
  },
  WEBSOCKET_EVENTS: {
    NOTIFICATION: "notifications",
  },
} as const;

export const QUERY_KEYS = {
  DOCUMENTS: "documents",
  DOCUMENT: "document",
};

export const STORAGE_KEYS = {
  OFFLINE_DOCUMENTS: "offline_documents",
  USER_PREFERENCES: "user_preferences",
};
