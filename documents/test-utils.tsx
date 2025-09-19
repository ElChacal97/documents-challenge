import { EndFlowModalProvider } from "@/contexts/EndFlowModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

  return (
    <QueryClientProvider client={queryClient}>
      <EndFlowModalProvider>{children}</EndFlowModalProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: any) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react-native";

// Override render method
export { customRender as render };
