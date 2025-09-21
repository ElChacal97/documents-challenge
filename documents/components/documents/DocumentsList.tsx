import { ViewMode } from "@/app/documents/documentsListScreen";
import { COLORS, SPACING } from "@/constants/theme";
import useDocument from "@/logic/hooks/useDocument";
import { sortDocuments } from "@/logic/utils/sorting";
import { Document } from "@/types/document";
import React, { useCallback, useMemo } from "react";
import { Alert, RefreshControl, Share, StyleSheet } from "react-native";
import FlatList from "../FlatList";
import Loader from "../Loader";
import DocumentItem from "./DocumentItem";
import { SortOption } from "./modals/SortDocumentModal";
import ErrorState from "../ErrorState";
import EmptyState from "../EmptyState";

interface DocumentsListProps {
  viewMode: ViewMode;
  sortOption: SortOption;
}

const DocumentsList = ({
  viewMode = "list",
  sortOption,
}: DocumentsListProps) => {
  const {
    listDocuments: { data: documents, isLoading, error, refetch, isRefetching },
  } = useDocument();

  const sortedDocuments = useMemo(() => {
    if (!documents) return [];
    return sortDocuments(documents, sortOption);
  }, [documents, sortOption]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const onDocumentPress = async (document: Document) => {
    try {
      await Share.share({
        message: `Check out this document: ${document.Title}`,
        title: document.Title,
        url: document.Attachments[0],
      });
    } catch (error) {
      console.error("Error sharing document:", error);
      Alert.alert("Error", "Failed to share document");
    }
  };

  const renderDocument = ({ item }: { item: Document }) => {
    return (
      <DocumentItem
        document={item}
        onPress={onDocumentPress}
        viewMode={viewMode}
      />
    );
  };

  const renderEmptyState = () => (
    <EmptyState
      title="No documents found"
      subtitle="Create your first document to get started"
    />
  );

  const renderErrorState = () => (
    <ErrorState
      title="Failed to load documents"
      subtitle="Please check your connection and try again"
      onRetry={handleRefresh}
    />
  );

  if (isLoading || isRefetching) {
    return <Loader />;
  }

  if (error) {
    return renderErrorState();
  }

  return (
    <FlatList
      testID="flat-list"
      data={sortedDocuments}
      renderItem={renderDocument}
      keyExtractor={(item) => item.ID}
      numColumns={viewMode === "grid" ? 2 : 1}
      key={`${viewMode}-${sortOption}`}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={handleRefresh}
          tintColor={COLORS.primary}
          colors={[COLORS.primary]}
        />
      }
      ListEmptyComponent={!isLoading ? renderEmptyState : null}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={viewMode === "grid" ? styles.gridRow : undefined}
    />
  );
};

export default DocumentsList;

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  gridRow: {
    justifyContent: "space-between",
  },
});
