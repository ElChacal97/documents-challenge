import DocumentsList from "@/components/documents/DocumentsList";
import type { NotificationData } from "@/types/document";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const DocumentsScreen = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      {/* <DocumentsHeader
        title="Documents"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddPress={handleAddPress}
        notificationCount={notifications.length}
      /> */}

      <DocumentsList viewMode={viewMode} />

      {/* <NotificationBanner
        notification={currentNotification}
        onDismiss={handleNotificationDismiss}
        onPress={handleNotificationPress}
      /> */}
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c9c9c93b",
  },
});
