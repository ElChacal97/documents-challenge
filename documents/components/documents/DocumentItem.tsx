import { COLORS } from "@/constants/theme";
import { Document } from "@/types/document";
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
import {
  formatRelativeTime,
  getFileTypeIcon,
  truncateText,
} from "../../logic/utils";

interface DocumentItemProps {
  document: Document;
  onPress: (document: Document) => void;
  onShare?: (document: Document) => void;
  variant?: "list" | "grid";
}

const DocumentItem = ({
  document,
  onPress,
  onShare,
  variant = "list",
}: DocumentItemProps) => {
  const handleShare = async () => {
    try {
      if (onShare) {
        onShare(document);
      } else {
        await Share.share({
          message: `Check out this document: ${document.title}`,
          title: document.title,
          url: document.attachments[0],
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
              {getFileTypeIcon(document.attachments[0])}
            </Text>
          </View>
          <Text style={styles.gridTitle} numberOfLines={2}>
            {truncateText(document.title, 20)}
          </Text>
          <Text style={styles.gridAuthor} numberOfLines={1}>
            {document.contributors[0].name}
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
          <Text style={styles.listIcon}>
            {/* {getFileTypeIcon(document.attachments[0])} */}
          </Text>
        </View>
        <View style={styles.listTextContainer}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {document.title}
          </Text>
          <Text style={styles.listSubtitle} numberOfLines={1}>
            {/* {document.contributors[0].name} •{" "} */}
            {/* {formatFileSize(document.attachments[0].length)} */}
          </Text>
          <Text style={styles.listTime}>
            {/* {formatRelativeTime(document.createdAt)} */}
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
};

export default DocumentItem;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: COLORS.surface,
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
  },
  listIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  listIcon: {
    fontSize: 20,
  },
  listTextContainer: {
    flex: 1,
  },
  listTitle: {
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  listSubtitle: {
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  listTime: {
    color: COLORS.textSecondary,
  },
  gridItem: {
    backgroundColor: COLORS.surface,
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
    alignItems: "center",
  },
  gridIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  gridIcon: {
    fontSize: 28,
  },
  gridTitle: {
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 4,
  },
  gridAuthor: {
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 4,
  },
  gridTime: {
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  shareButton: {
    position: "absolute",
  },
});
