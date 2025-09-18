import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import useDocument from "@/logic/hooks/useDocument";
import { Document } from "@/types/document";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FlatList from "../FlatList";
import Loader from "../Loader";
import DocumentItem from "./DocumentItem";

interface DocumentsListProps {
  viewMode: "list" | "grid";
}

const DocumentsList = ({ viewMode = "list" }: DocumentsListProps) => {
  const {
    listDocuments: { data: documents, isLoading, error, refetch, isRefetching },
  } = useDocument();

  console.log("documents", documents);

  const handleRefresh = () => {
    refetch();
  };

  const onDocumentPress = (document: Document) => {
    console.log(document);
  };

  const onDocumentShare = (document: Document) => {
    console.log(document);
  };

  const renderDocument = ({ item }: { item: Document }) => (
    <DocumentItem
      document={item}
      onPress={onDocumentPress}
      onShare={onDocumentShare}
      variant={viewMode}
    />
  );

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
    <View style={styles.container}>
      <FlatList
        data={documents}
        renderItem={renderDocument}
        keyExtractor={(item) => item.ID}
        numColumns={viewMode === "grid" ? 2 : 1}
        key={viewMode}
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
    </View>
  );
};

export default DocumentsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: SPACING.sm,
  },
  gridRow: {
    justifyContent: "space-around",
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
