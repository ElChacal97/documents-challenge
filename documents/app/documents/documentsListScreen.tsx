import AddDocumentButton from "@/components/documents/AddDocumentButton";
import DocumentsHeader from "@/components/documents/DocumentsHeader";
import DocumentsList from "@/components/documents/DocumentsList";
import DocumentsListHeader from "@/components/documents/DocumentsListHeader";
import SortModal, {
  SortOption,
} from "@/components/documents/modals/SortDocumentModal";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const DocumentsScreen = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  const handleSortPress = () => {
    setIsSortModalVisible(true);
  };

  const handleSortSelect = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  const handleCloseSortModal = () => {
    setIsSortModalVisible(false);
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
        onNotificationPress={handleNotificationPress}
        notificationCount={1}
      />

      <DocumentsListHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSortPress={handleSortPress}
        currentSort={sortOption}
      />

      <DocumentsList viewMode={viewMode} sortOption={sortOption} />

      <AddDocumentButton onPress={handleAddPress} />

      <SortModal
        isVisible={isSortModalVisible}
        onClose={handleCloseSortModal}
        onSortSelect={handleSortSelect}
        currentSort={sortOption}
      />
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
