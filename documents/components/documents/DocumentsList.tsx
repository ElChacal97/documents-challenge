import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import useDocument from "@/logic/hooks/useDocument";
import { sortDocuments } from "@/logic/utils/sorting";
import { Document } from "@/types/document";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  Alert,
  RefreshControl,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FlatList from "../FlatList";
import Loader from "../Loader";
import DocumentGridItem from "./DocumentGridItem";
import DocumentListItem from "./DocumentListItem";
import { SortOption } from "./modals/SortDocumentModal";

interface DocumentsListProps {
  viewMode: "list" | "grid";
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

  const handleRefresh = () => {
    refetch();
  };

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
    if (viewMode === "grid") {
      return <DocumentGridItem document={item} onPress={onDocumentPress} />;
    }
    return <DocumentListItem document={item} onPress={onDocumentPress} />;
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="document-outline"
        size={64}
        color={COLORS.textSecondary}
      />
      <Text style={styles.emptyTitle}>No documents found</Text>
      <Text style={styles.emptySubtitle}>
        Create your first document to get started
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle-outline" size={64} color={COLORS.error} />
      <Text style={styles.errorTitle}>Failed to load documents</Text>
      <Text style={styles.errorSubtitle}>
        Please check your connection and try again
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading || isRefetching) {
    return <Loader />;
  }

  if (error) {
    return renderErrorState();
  }

  return (
    <FlatList
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  errorTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.error,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  errorSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },
});
