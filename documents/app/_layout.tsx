import { EndFlowModalProvider } from "@/contexts/EndFlowModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <EndFlowModalProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              options={{ headerTitle: "Documents", headerTitleAlign: "left" }}
              name="documents/documentsListScreen"
            />
          </Stack>
        </EndFlowModalProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
