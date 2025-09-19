import EndFlowModal from "@/components/modals/EndFlowModal";
import NotificationBanner from "@/components/NotificationBanner";
import { EndFlowModalProvider } from "@/contexts/EndFlowModalContext";
import { NotificationQueueProvider } from "@/contexts/NotificationQueueContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}
        >
          <NotificationQueueProvider>
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
                  options={{
                    headerTitle: "Documents",
                    headerTitleAlign: "left",
                  }}
                  name="documents/documentsListScreen"
                />
              </Stack>
              <EndFlowModal />
              <NotificationBanner />
            </EndFlowModalProvider>
          </NotificationQueueProvider>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
