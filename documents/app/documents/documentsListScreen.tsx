import AddDocumentButton from "@/components/documents/AddDocumentButton";
import DocumentsHeader from "@/components/documents/DocumentsHeader";
import DocumentsList from "@/components/documents/DocumentsList";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const DocumentsScreen = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const handleSortPress = () => {
    console.log("Sort pressed");
  };

  const handleNotificationPress = () => {
    console.log("Notification pressed");
  };

  const handleAddPress = () => {
    console.log("Add document pressed");
  };

  return (
    <View style={styles.container}>
      <DocumentsHeader
        title="Documents"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSortPress={handleSortPress}
        onNotificationPress={handleNotificationPress}
        notificationCount={1}
      />

      <DocumentsList viewMode={viewMode} />

      <AddDocumentButton onPress={handleAddPress} />
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
});
