import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { useNotificationQueue } from "@/contexts/NotificationQueueContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DocumentsHeaderProps {
  title: string;
}

const DocumentsHeader = ({ title }: DocumentsHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const {
    state: { totalCount },
    clearQueue,
  } = useNotificationQueue();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={clearQueue}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={COLORS.text}
          />
          {totalCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentsHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "700",
    color: COLORS.text,
  },
  notificationButton: {
    position: "relative",
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badge: {
    position: "absolute",
    top: 3,
    right: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: COLORS.surface,
    fontSize: 10,
    fontWeight: "600",
  },
});
