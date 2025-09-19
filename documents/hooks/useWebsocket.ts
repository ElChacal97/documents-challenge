import { useEffect } from "react";

interface UseWebSocketProps {
  url: string;
  onMessage: <T extends unknown>(data: T) => void;
}

const useWebSockets = ({ url, onMessage }: UseWebSocketProps) => {
  useEffect(() => {
    const websocket = new WebSocket(url);

    websocket.onopen = () => {
      console.log("WebSocket connected for notifications");
    };

    websocket.onmessage = (event: MessageEvent) => {
      try {
        const data: unknown = JSON.parse(event.data);

        if (data) {
          onMessage(data);
        }
      } catch (error) {
        console.error("Error parsing notification data:", error);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      websocket.close();
    };
  }, [url, onMessage]);
};

export default useWebSockets;
