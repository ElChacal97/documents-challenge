import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { Document } from "@/types/document";
import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "../Card";
import Text from "../Text";

interface DocumentGridItemProps {
  document: Document;
  onPress: (document: Document) => void;
}

const DocumentGridItem = ({ document, onPress }: DocumentGridItemProps) => {
  return (
    <Card onPress={() => onPress(document)} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {document.Title}
        </Text>
        <Text style={styles.version}>Version {document.Version}</Text>
      </View>
    </Card>
  );
};

export default DocumentGridItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.xs,
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
