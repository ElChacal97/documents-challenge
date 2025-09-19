import { API_CONFIG } from "@/constants/api";
import useWebSockets from "@/hooks/useWebSockets";
import { NotificationItem } from "@/types/document";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface NotificationQueueState {
  queue: NotificationItem[];
  currentNotification: NotificationItem | null;
  isShowing: boolean;
  totalCount: number;
}

type NotificationQueueAction =
  | { type: "ADD_NOTIFICATION"; payload: NotificationItem }
  | { type: "SHOW_NEXT" }
  | { type: "HIDE_CURRENT" }
  | { type: "CLEAR_QUEUE" };

const initialState: NotificationQueueState = {
  queue: [],
  currentNotification: null,
  isShowing: false,
  totalCount: 0,
};

function notificationQueueReducer(
  state: NotificationQueueState,
  action: NotificationQueueAction
): NotificationQueueState {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        queue: [...state.queue, action.payload],
        totalCount: state.totalCount + 1,
      };
    case "SHOW_NEXT":
      if (state.queue.length === 0) {
        return {
          ...state,
          currentNotification: null,
          isShowing: false,
        };
      }
      const [nextNotification, ...remainingQueue] = state.queue;
      return {
        ...state,
        currentNotification: nextNotification,
        queue: remainingQueue,
        isShowing: true,
      };
    case "HIDE_CURRENT":
      return {
        ...state,
        isShowing: false,
      };
    case "CLEAR_QUEUE":
      return {
        ...state,
        queue: [],
        currentNotification: null,
        isShowing: false,
        totalCount: 0,
      };
    default:
      return state;
  }
}

interface NotificationQueueContextType {
  state: NotificationQueueState;
  addNotification: (notification: NotificationItem) => void;
  showNext: () => void;
  hideCurrent: () => void;
  clearQueue: () => void;
}

const NotificationQueueContext = createContext<
  NotificationQueueContextType | undefined
>(undefined);

interface NotificationQueueProviderProps {
  children: ReactNode;
}

export function NotificationQueueProvider({
  children,
}: NotificationQueueProviderProps) {
  const [state, dispatch] = useReducer(notificationQueueReducer, initialState);
  useWebSockets({
    url: API_CONFIG.WS_URL + API_CONFIG.WEBSOCKET_EVENTS.NOTIFICATION,
    onMessage: <T extends unknown | NotificationItem>(data: T) =>
      onWebSocketMessage(data as NotificationItem),
  });

  const onWebSocketMessage = (data: NotificationItem) => {
    if (data) {
      addNotification(data);
    }
  };

  const addNotification = (notification: NotificationItem) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
  };

  const hideCurrent = () => {
    dispatch({ type: "HIDE_CURRENT" });
  };

  const clearQueue = () => {
    dispatch({ type: "CLEAR_QUEUE" });
  };

  const showNext = () => {
    dispatch({ type: "SHOW_NEXT" });
  };

  useEffect(() => {
    if (
      state.queue.length > 0 &&
      !state.isShowing &&
      !state.currentNotification
    ) {
      dispatch({ type: "SHOW_NEXT" });
    }
  }, [state.queue.length, state.isShowing, state.currentNotification]);

  const value: NotificationQueueContextType = {
    state,
    addNotification,
    hideCurrent,
    clearQueue,
    showNext,
  };

  return (
    <NotificationQueueContext.Provider value={value}>
      {children}
    </NotificationQueueContext.Provider>
  );
}

export function useNotificationQueue() {
  const context = useContext(NotificationQueueContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationQueue must be used within a NotificationQueueProvider"
    );
  }
  return context;
}
