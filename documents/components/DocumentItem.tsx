import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "../constants";
import {
  formatFileSize,
  formatRelativeTime,
  getFileTypeIcon,
  truncateText,
} from "../logic/utils";
import type { Document } from "../types";

interface DocumentItemProps {
  document: Document;
  onPress: (document: Document) => void;
  onShare?: (document: Document) => void;
  variant?: "list" | "grid";
}

export function DocumentItem({
  document,
  onPress,
  onShare,
  variant = "list",
}: DocumentItemProps) {
  const handleShare = async () => {
    try {
      if (onShare) {
        onShare(document);
      } else {
        await Share.share({
          message: `Check out this document: ${document.title}`,
          title: document.title,
          url: document.url,
        });
      }
    } catch (error) {
      console.error("Error sharing document:", error);
      Alert.alert("Error", "Failed to share document");
    }
  };

  if (variant === "grid") {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => onPress(document)}
        activeOpacity={0.7}
      >
        <View style={styles.gridContent}>
          <View style={styles.gridIconContainer}>
            <Text style={styles.gridIcon}>
              {getFileTypeIcon(document.type)}
            </Text>
          </View>
          <Text style={styles.gridTitle} numberOfLines={2}>
            {truncateText(document.title, 20)}
          </Text>
          <Text style={styles.gridAuthor} numberOfLines={1}>
            {document.author.name}
          </Text>
          <Text style={styles.gridTime}>
            {formatRelativeTime(document.createdAt)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="share-outline"
            size={16}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onPress(document)}
      activeOpacity={0.7}
    >
      <View style={styles.listContent}>
        <View style={styles.listIconContainer}>
          <Text style={styles.listIcon}>{getFileTypeIcon(document.type)}</Text>
        </View>
        <View style={styles.listTextContainer}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {document.title}
          </Text>
          <Text style={styles.listSubtitle} numberOfLines={1}>
            {document.author.name} • {formatFileSize(document.size)}
          </Text>
          <Text style={styles.listTime}>
            {formatRelativeTime(document.createdAt)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="share-outline"
            size={20}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
  },
  listIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  listIcon: {
    fontSize: 20,
  },
  listTextContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  listSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  listTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  gridItem: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    margin: SPACING.xs,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  gridContent: {
    padding: SPACING.md,
    alignItems: "center",
  },
  gridIconContainer: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  gridIcon: {
    fontSize: 28,
  },
  gridTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 4,
  },
  gridAuthor: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 4,
  },
  gridTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  shareButton: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    padding: SPACING.xs,
  },
});
