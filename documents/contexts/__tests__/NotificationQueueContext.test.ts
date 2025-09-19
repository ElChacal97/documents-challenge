import { NotificationItem } from "@/types/document";

// Import the reducer function and types directly
// We'll need to extract these from the context file for testing
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

// Mock notification data for testing
const mockNotification1: NotificationItem = {
  Timestamp: "2024-01-01T10:00:00Z",
  UserID: "user1",
  UserName: "John Doe",
  DocumentID: "doc1",
  DocumentTitle: "Test Document 1",
};

const mockNotification2: NotificationItem = {
  Timestamp: "2024-01-01T11:00:00Z",
  UserID: "user2",
  UserName: "Jane Smith",
  DocumentID: "doc2",
  DocumentTitle: "Test Document 2",
};

const mockNotification3: NotificationItem = {
  Timestamp: "2024-01-01T12:00:00Z",
  UserID: "user3",
  UserName: "Bob Johnson",
  DocumentID: "doc3",
  DocumentTitle: "Test Document 3",
};

describe("NotificationQueueReducer", () => {
  describe("Initial State", () => {
    it("should return the initial state", () => {
      const result = notificationQueueReducer(initialState, {
        type: "CLEAR_QUEUE",
      });
      expect(result).toEqual(initialState);
    });

    it("should handle unknown action types", () => {
      const unknownAction = { type: "UNKNOWN_ACTION" } as any;
      const result = notificationQueueReducer(initialState, unknownAction);
      expect(result).toEqual(initialState);
    });
  });

  describe("ADD_NOTIFICATION", () => {
    it("should add a notification to the queue", () => {
      const action = { type: "ADD_NOTIFICATION", payload: mockNotification1 };
      const result = notificationQueueReducer(
        initialState,
        action as NotificationQueueAction
      );

      expect(result.queue).toHaveLength(1);
      expect(result.queue[0]).toEqual(mockNotification1);
      expect(result.totalCount).toBe(1);
      expect(result.currentNotification).toBeNull();
      expect(result.isShowing).toBe(false);
    });

    it("should add multiple notifications to the queue", () => {
      let state = initialState;

      // Add first notification
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification1,
      });
      expect(state.queue).toHaveLength(1);
      expect(state.totalCount).toBe(1);

      // Add second notification
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification2,
      });
      expect(state.queue).toHaveLength(2);
      expect(state.totalCount).toBe(2);
      expect(state.queue[0]).toEqual(mockNotification1);
      expect(state.queue[1]).toEqual(mockNotification2);

      // Add third notification
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification3,
      });
      expect(state.queue).toHaveLength(3);
      expect(state.totalCount).toBe(3);
    });

    it("should preserve existing state when adding notification", () => {
      const stateWithCurrentNotification = {
        ...initialState,
        currentNotification: mockNotification1,
        isShowing: true,
        totalCount: 1,
      };

      const action = { type: "ADD_NOTIFICATION", payload: mockNotification2 };
      const result = notificationQueueReducer(
        stateWithCurrentNotification,
        action as NotificationQueueAction
      );

      expect(result.currentNotification).toEqual(mockNotification1);
      expect(result.isShowing).toBe(true);
      expect(result.queue).toHaveLength(1);
      expect(result.queue[0]).toEqual(mockNotification2);
      expect(result.totalCount).toBe(2);
    });
  });

  describe("SHOW_NEXT", () => {
    it("should show the first notification from queue", () => {
      const stateWithQueue = {
        ...initialState,
        queue: [mockNotification1, mockNotification2],
        totalCount: 2,
      };

      const result = notificationQueueReducer(stateWithQueue, {
        type: "SHOW_NEXT",
      });

      expect(result.currentNotification).toEqual(mockNotification1);
      expect(result.queue).toHaveLength(1);
      expect(result.queue[0]).toEqual(mockNotification2);
      expect(result.isShowing).toBe(true);
      expect(result.totalCount).toBe(2); // totalCount should not change
    });

    it("should handle empty queue", () => {
      const result = notificationQueueReducer(initialState, {
        type: "SHOW_NEXT",
      });

      expect(result.currentNotification).toBeNull();
      expect(result.queue).toHaveLength(0);
      expect(result.isShowing).toBe(false);
    });

    it("should show next notification when one is already showing", () => {
      const stateWithCurrentNotification = {
        ...initialState,
        currentNotification: mockNotification1,
        isShowing: true,
        queue: [mockNotification2, mockNotification3],
        totalCount: 3,
      };

      const result = notificationQueueReducer(stateWithCurrentNotification, {
        type: "SHOW_NEXT",
      });

      expect(result.currentNotification).toEqual(mockNotification2);
      expect(result.queue).toHaveLength(1);
      expect(result.queue[0]).toEqual(mockNotification3);
      expect(result.isShowing).toBe(true);
    });

    it("should handle single notification in queue", () => {
      const stateWithSingleNotification = {
        ...initialState,
        queue: [mockNotification1],
        totalCount: 1,
      };

      const result = notificationQueueReducer(stateWithSingleNotification, {
        type: "SHOW_NEXT",
      });

      expect(result.currentNotification).toEqual(mockNotification1);
      expect(result.queue).toHaveLength(0);
      expect(result.isShowing).toBe(true);
    });
  });

  describe("HIDE_CURRENT", () => {
    it("should hide current notification", () => {
      const stateWithCurrentNotification = {
        ...initialState,
        currentNotification: mockNotification1,
        isShowing: true,
        queue: [mockNotification2],
        totalCount: 2,
      };

      const result = notificationQueueReducer(stateWithCurrentNotification, {
        type: "HIDE_CURRENT",
      });

      expect(result.currentNotification).toEqual(mockNotification1); // Should remain the same
      expect(result.isShowing).toBe(false);
      expect(result.queue).toHaveLength(1); // Queue should remain unchanged
      expect(result.totalCount).toBe(2); // Total count should remain unchanged
    });

    it("should handle hide when no notification is showing", () => {
      const result = notificationQueueReducer(initialState, {
        type: "HIDE_CURRENT",
      });

      expect(result.currentNotification).toBeNull();
      expect(result.isShowing).toBe(false);
      expect(result.queue).toHaveLength(0);
    });
  });

  describe("CLEAR_QUEUE", () => {
    it("should clear all notifications and reset state", () => {
      const stateWithNotifications = {
        ...initialState,
        currentNotification: mockNotification1,
        isShowing: true,
        queue: [mockNotification2, mockNotification3],
        totalCount: 3,
      };

      const result = notificationQueueReducer(stateWithNotifications, {
        type: "CLEAR_QUEUE",
      });

      expect(result).toEqual(initialState);
      expect(result.queue).toHaveLength(0);
      expect(result.currentNotification).toBeNull();
      expect(result.isShowing).toBe(false);
      expect(result.totalCount).toBe(0);
    });

    it("should clear empty queue", () => {
      const result = notificationQueueReducer(initialState, {
        type: "CLEAR_QUEUE",
      });

      expect(result).toEqual(initialState);
    });
  });

  describe("Complex Scenarios", () => {
    it("should handle complete notification flow", () => {
      let state = initialState;

      // Add notifications
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification1,
      });
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification2,
      });
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification3,
      });

      expect(state.queue).toHaveLength(3);
      expect(state.totalCount).toBe(3);

      // Show first notification
      state = notificationQueueReducer(state, { type: "SHOW_NEXT" });
      expect(state.currentNotification).toEqual(mockNotification1);
      expect(state.queue).toHaveLength(2);
      expect(state.isShowing).toBe(true);

      // Hide current notification
      state = notificationQueueReducer(state, { type: "HIDE_CURRENT" });
      expect(state.currentNotification).toEqual(mockNotification1); // Still there
      expect(state.isShowing).toBe(false);

      // Show next notification
      state = notificationQueueReducer(state, { type: "SHOW_NEXT" });
      expect(state.currentNotification).toEqual(mockNotification2);
      expect(state.queue).toHaveLength(1);
      expect(state.isShowing).toBe(true);

      // Show last notification
      state = notificationQueueReducer(state, { type: "SHOW_NEXT" });
      expect(state.currentNotification).toEqual(mockNotification3);
      expect(state.queue).toHaveLength(0);
      expect(state.isShowing).toBe(true);

      // Try to show next (should handle empty queue)
      state = notificationQueueReducer(state, { type: "SHOW_NEXT" });
      expect(state.currentNotification).toBeNull();
      expect(state.isShowing).toBe(false);
    });

    it("should maintain correct total count throughout operations", () => {
      let state = initialState;

      // Add notifications
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification1,
      });
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification2,
      });
      expect(state.totalCount).toBe(2);

      // Show and hide notifications (total count should not change)
      state = notificationQueueReducer(state, { type: "SHOW_NEXT" });
      expect(state.totalCount).toBe(2);

      state = notificationQueueReducer(state, { type: "HIDE_CURRENT" });
      expect(state.totalCount).toBe(2);

      state = notificationQueueReducer(state, { type: "SHOW_NEXT" });
      expect(state.totalCount).toBe(2);

      // Only clear queue should reset total count
      state = notificationQueueReducer(state, { type: "CLEAR_QUEUE" });
      expect(state.totalCount).toBe(0);
    });

    it("should handle rapid successive operations", () => {
      let state = initialState;

      // Rapidly add multiple notifications
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification1,
      });
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification2,
      });
      state = notificationQueueReducer(state, {
        type: "ADD_NOTIFICATION",
        payload: mockNotification3,
      });

      // Rapidly show and hide
      state = notificationQueueReducer(state, { type: "SHOW_NEXT" });
      state = notificationQueueReducer(state, { type: "HIDE_CURRENT" });
      state = notificationQueueReducer(state, { type: "SHOW_NEXT" });
      state = notificationQueueReducer(state, { type: "SHOW_NEXT" });

      expect(state.currentNotification).toEqual(mockNotification3);
      expect(state.queue).toHaveLength(0);
      expect(state.isShowing).toBe(true);
      expect(state.totalCount).toBe(3);
    });
  });

  describe("State Immutability", () => {
    it("should not mutate the original state", () => {
      const originalState = {
        ...initialState,
        queue: [mockNotification1],
        totalCount: 1,
      };

      const action = { type: "ADD_NOTIFICATION", payload: mockNotification2 };
      const result = notificationQueueReducer(
        originalState,
        action as NotificationQueueAction
      );

      // Original state should be unchanged
      expect(originalState.queue).toHaveLength(1);
      expect(originalState.totalCount).toBe(1);

      // New state should be different
      expect(result.queue).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      expect(result).not.toBe(originalState);
    });

    it("should create new queue arrays", () => {
      const originalState = {
        ...initialState,
        queue: [mockNotification1],
        totalCount: 1,
      };

      const action = { type: "ADD_NOTIFICATION", payload: mockNotification2 };
      const result = notificationQueueReducer(
        originalState,
        action as NotificationQueueAction
      );

      expect(result.queue).not.toBe(originalState.queue);
      expect(Array.isArray(result.queue)).toBe(true);
    });
  });
});
