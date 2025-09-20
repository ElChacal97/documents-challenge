import { EndFlowModalProvider } from "@/contexts/EndFlowModalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { render as rtlRender } from "@testing-library/react-native";
import React from "react";

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  return (
    <EndFlowModalProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        {children}
      </PersistQueryClientProvider>
    </EndFlowModalProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: any) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react-native";

// Override render method
export { customRender as render };
