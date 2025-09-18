import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { Document } from "@/types/document";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../Text";

interface DocumentGridItemProps {
  document: Document;
  onPress: (document: Document) => void;
}

const DocumentGridItem = ({ document, onPress }: DocumentGridItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(document)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {document.Title}
        </Text>
        <Text style={styles.version}>Version {document.Version}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentGridItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    marginHorizontal: SPACING.xs,
    flex: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "left",
    marginBottom: SPACING.xs,
  },
  version: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
