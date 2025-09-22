import { API_CONFIG } from "@/constants/api";

export const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  console.log(`🌐 Making API request to: ${url}`);
  console.log(`📋 Request config:`, {
    method: config.method || "GET",
    headers: config.headers,
    body: config.body ? "Present" : "None",
  });

  try {
    const response = await fetch(url, config);

    console.log(
      `📡 Response status: ${response.status} ${response.statusText}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ HTTP error! status: ${response.status}`, errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ API request successful:`, data);
    return data;
  } catch (error) {
    console.error("❌ API request failed:", {
      url,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
};

export const webSocketRequest = <T>(
  endpoint: string,
  onSuccess: (data: T) => void,
  onError?: (error: Error) => void
) => {
  const websocket = new WebSocket(endpoint);

  websocket.onopen = () => {
    console.log("WebSocket connected for notifications");
  };

  websocket.onmessage = (event: MessageEvent) => {
    try {
      const data: T = JSON.parse(event.data);

      if (data) {
        onSuccess(data);
      }
    } catch (error) {
      console.error("Error parsing data:", error);
      onError?.(error as Error);
    }
  };

  websocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  websocket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  return websocket;
};
