import AddDocumentButton from "@/components/documents/AddDocumentButton";
import DocumentsHeader from "@/components/documents/DocumentsHeader";
import DocumentsList from "@/components/documents/DocumentsList";
import DocumentsListHeader from "@/components/documents/DocumentsListHeader";
import AddDocumentModal from "@/components/documents/modals/AddDocumentModal";
import SortModal, {
  SortOption,
} from "@/components/documents/modals/SortDocumentModal";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const DocumentsScreen = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [isAddDocumentModalVisible, setIsAddDocumentModalVisible] =
    useState(false);

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
    setIsAddDocumentModalVisible(true);
  };

  const handleCloseAddDocumentModal = () => {
    setIsAddDocumentModalVisible(false);
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

      <AddDocumentModal
        isVisible={isAddDocumentModalVisible}
        onClose={handleCloseAddDocumentModal}
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
