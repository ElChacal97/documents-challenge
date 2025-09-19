import { Platform } from "react-native";

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === "android") {
      return "http://192.168.0.206:8085";
    }
    return "http://localhost:8085";
  }
  return "http://localhost:8085";
};

const getFallbackUrls = () => {
  if (__DEV__) {
    return [
      "http://localhost:8085",
      "http://127.0.0.1:8085",
      "http://192.168.0.206:8085",
      "http://10.0.2.2:8085",
    ];
  }
  return ["http://localhost:8085"];
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  FALLBACK_URLS: getFallbackUrls(),
  WS_URL: getBaseUrl().replace("http", "ws"),
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
