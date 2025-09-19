import { API_CONFIG } from "@/constants/api";
import { NotificationData } from "@/types/document";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useNotification = () => {
  const queryClient = useQueryClient();

  const listNotifications = useQuery({
    queryKey: ["notifications"],
    queryFn: () => queryClient.getQueryData(["notifications"]) || [],
  });

  useEffect(() => {
    const websocket = new WebSocket(
      API_CONFIG.WS_URL + API_CONFIG.WEBSOCKET_EVENTS.NOTIFICATION
    );
    websocket.onopen = () => {
      console.log("CONNECTED");
    };
    websocket.onmessage = (event: MessageEvent<NotificationData>) => {
      //console.log("SUBSCRIPTION", event.data);
      const data = event.data;
      queryClient.setQueryData(["notifications"], (old: NotificationData[]) => [
        ...old,
        data,
      ]);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);

  return {
    listNotifications,
  };
};

export default useNotification;
