import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";

export const TTL_IN_MS = 1000 * 60 * 60 * 24 * 30;

interface AsyncStorageType {
  documents?: {
    lastUpdated: Date;
    data: Document[];
  };
  notifications?: {
    lastUpdated: Date;
    data: Notification[];
  };
}

interface State {
  asyncStorage: AsyncStorageType;
}

interface SetAsyncStorage {
  type: "SET_ASYNC_STORAGE";
  asyncStorage: AsyncStorageType;
}

type Action = SetAsyncStorage;

type Dispatch = (action: Action) => void;

interface AppStorageContextData {
  state: State;
  dispatch: Dispatch;
  getItemOnce: <K extends keyof AsyncStorageType>(
    key: K
  ) => Promise<AsyncStorageType[K] | undefined>;
  save: <K extends keyof AsyncStorageType>(
    key: K,
    value: AsyncStorageType[K]
  ) => Promise<void>;
  clearItem: <K extends keyof AsyncStorageType>(key: K) => Promise<void>;
}

const asyncStorageKey = "appStorage";

const setAsyncStorage = async (asyncStorage: AsyncStorageType) => {
  try {
    await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(asyncStorage));
  } catch (error) {
    console.error("Error setting async storage: ", error);
  }
};

const AppStorageContext = React.createContext<
  AppStorageContextData | undefined
>(undefined);

function appStorageReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ASYNC_STORAGE":
      setAsyncStorage({ ...state.asyncStorage, ...action.asyncStorage });
      return {
        ...state,
        asyncStorage: { ...state.asyncStorage, ...action.asyncStorage },
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

function AppStorageProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [state, dispatch] = React.useReducer(appStorageReducer, {
    asyncStorage: {},
  });

  /**
   * Save a key value pair to async storage and update the state
   * @param key
   * @param value
   */
  const save = async <K extends keyof AsyncStorageType>(
    key: K,
    value: AsyncStorageType[K]
  ) => {
    const asyncStorage = { ...state.asyncStorage, [key]: value };
    dispatch({
      type: "SET_ASYNC_STORAGE",
      asyncStorage,
    });
    try {
      await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(asyncStorage));
    } catch (error) {
      console.error("Error setting async storage: ", error);
    }
  };

  const getItemOnce = async <K extends keyof AsyncStorageType>(
    key: K
  ): Promise<AsyncStorageType[K] | undefined> => {
    try {
      const storage = await AsyncStorage.getItem(asyncStorageKey);
      if (storage === null) {
        return undefined;
      }
      const asyncStorage = JSON.parse(storage) as AsyncStorageType;
      return asyncStorage[key];
    } catch (error) {
      console.error("Error fetching async storage: ", error);
      return undefined;
    }
  };

  const clearItem = async <K extends keyof AsyncStorageType>(key: K) => {
    const asyncStorage = { ...state.asyncStorage, [key]: undefined };
    dispatch({
      type: "SET_ASYNC_STORAGE",
      asyncStorage,
    });
    await AsyncStorage.removeItem(key);
  };

  const fetchAppAsyncStorage = async () => {
    try {
      const storage = await AsyncStorage.getItem(asyncStorageKey);
      if (storage === null) {
        return;
      }
      const asyncStorage = JSON.parse(storage) as AsyncStorageType;
      dispatch({
        type: "SET_ASYNC_STORAGE",
        asyncStorage,
      });
    } catch (error) {
      console.error("Error fetching async storage: ", error);
    }
  };

  useEffect(() => {
    fetchAppAsyncStorage();
  }, []);

  return (
    <AppStorageContext.Provider
      value={{ state, dispatch, getItemOnce, save, clearItem }}
    >
      {children}
    </AppStorageContext.Provider>
  );
}

function useAppStorage(): AppStorageContextData {
  const context = React.useContext(AppStorageContext);
  if (context === undefined) {
    throw new Error("useAppStorage must be used within a AppStorageProvider");
  }
  return context;
}

export { AppStorageProvider, useAppStorage };
