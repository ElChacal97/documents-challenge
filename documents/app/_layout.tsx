import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen name="index" options={{ headerTitle: "Documents" }} />
          <Stack.Screen
            options={{ headerTitle: "Documents" }}
            name="documents/documentsListScreen"
          />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
