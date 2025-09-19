import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { Document } from "@/types/document";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../Text";

interface DocumentListItemProps {
  document: Document;
  onPress: (document: Document) => void;
}

const DocumentListItem = ({ document, onPress }: DocumentListItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(document)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {document.Title}
            </Text>
            <Text style={styles.version}>Version {document.Version}</Text>
          </View>
          <Text style={styles.updatedAt}>
            Updated {new Date(document.UpdatedAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <Ionicons name="people-outline" size={18} color={COLORS.icon} />
              <Text style={styles.sectionTitle}>Contributors</Text>
            </View>
            <View style={styles.sectionContentWrapper}>
              {document.Contributors?.map((contributor) => (
                <Text
                  style={styles.sectionContent}
                  key={contributor.ID}
                  numberOfLines={1}
                >
                  {contributor.Name}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <Ionicons name="link" size={18} color={COLORS.textSecondary} />
              <Text style={styles.sectionTitle}>Attachments</Text>
            </View>
            <View style={styles.sectionContentWrapper}>
              {document.Attachments.map((attachment, index) => (
                <Text
                  style={styles.sectionContent}
                  key={index}
                  numberOfLines={1}
                >
                  {attachment}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
    borderRadius: 8,
    padding: SPACING.md,
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
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
    color: COLORS.text,
    flexShrink: 1,
  },
  version: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  updatedAt: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "right",
    marginTop: 2,
    fontStyle: "italic",
  },
  section: {
    marginBottom: SPACING.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
    color: COLORS.text,
    marginLeft: 4,
  },
  sectionContent: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  sectionWrapper: {
    flex: 1,
  },
  sectionContentWrapper: {
    flexDirection: "column",
    flexWrap: "wrap",
    flex: 1,
  },
});
