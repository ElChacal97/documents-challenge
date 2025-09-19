export const API_CONFIG = {
  BASE_URL: "http://localhost:8080",
  WS_URL: "ws://localhost:8080",
  ENDPOINTS: {
    DOCUMENTS: "/documents",
  },
  WEBSOCKET_EVENTS: {
    NOTIFICATION: "/notifications",
  },
} as const;

export const QUERY_KEYS = {
  DOCUMENTS: "documents",
};

export const STORAGE_KEYS = {
  DOCUMENTS: "documents",
  NOTIFICATIONS: "notifications",
};
