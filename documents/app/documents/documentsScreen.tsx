import useDocument from "@/logic/hooks/useDocument";
import type { NotificationData } from "@/types/document";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const DocumentsScreen = () => {
  // const { getDocuments } = useDocuments();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { listDocuments } = useDocument();

  console.log(listDocuments);

  // const handleDocumentPress = (document: Document) => {
  //   // Navigate to document details
  //   console.log("Document pressed:", document);
  //   Alert.alert(
  //     "Document Details",
  //     `Title: ${document.title}\nAuthor: ${document.author.name}`
  //   );
  // };

  // const handleDocumentShare = async (document: Document) => {
  //   try {
  //     await Share.share({
  //       message: `Check out this document: ${document.title}`,
  //       title: document.title,
  //       url: document.url,
  //     });
  //   } catch (error) {
  //     console.error("Error sharing document:", error);
  //   }
  // };

  // const handleAddPress = () => {
  //   setShowCreateForm(true);
  // };

  // const handleCreateSuccess = (document: Document) => {
  //   setShowCreateForm(false);
  //   Alert.alert("Success", "Document created successfully!");
  // };

  // const handleCreateCancel = () => {
  //   setShowCreateForm(false);
  // };

  // const handleRefresh = async () => {
  //   setIsRefreshing(true);
  //   // Simulate refresh delay
  //   setTimeout(() => {
  //     setIsRefreshing(false);
  //   }, 1000);
  // };

  // const handleNotificationPress = (notification: NotificationData) => {
  //   console.log("Notification pressed:", notification);
  //   // Handle notification press - could navigate to document
  // };

  // const handleNotificationDismiss = () => {
  //   setCurrentNotification(null);
  // };

  // // Show latest notification
  // React.useEffect(() => {
  //   const latest = getLatestNotification();
  //   if (latest && latest !== currentNotification) {
  //     setCurrentNotification(latest);
  //   }
  // }, [notifications, currentNotification, getLatestNotification]);

  // if (showCreateForm) {
  //   // Import CreateDocumentForm dynamically to avoid circular imports
  //   const { CreateDocumentForm } = require("../components");
  //   return (
  //     <CreateDocumentForm
  //       onSuccess={handleCreateSuccess}
  //       onCancel={handleCreateCancel}
  //     />
  //   );
  // }

  return (
    <View style={styles.container}>
      {/* <DocumentsHeader
        title="Documents"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddPress={handleAddPress}
        notificationCount={notifications.length}
      /> */}

      {/* <DocumentsList
        onDocumentPress={handleDocumentPress}
        onDocumentShare={handleDocumentShare}
        viewMode={viewMode}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <NotificationBanner
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
