import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DocumentsHeaderProps {
  title: string;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  onSortPress: () => void;
  onNotificationPress: () => void;
  notificationCount?: number;
}

const DocumentsHeader = ({
  title,
  viewMode,
  onViewModeChange,
  onSortPress,
  onNotificationPress,
  notificationCount = 0,
}: DocumentsHeaderProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.text}
          />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.sortButton} onPress={onSortPress}>
          <Text style={styles.sortText}>Sort by</Text>
          <Ionicons
            name="chevron-down-outline"
            size={16}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === "list" && styles.toggleButtonActive,
            ]}
            onPress={() => onViewModeChange("list")}
          >
            <Ionicons
              name="list-outline"
              size={20}
              color={
                viewMode === "list" ? COLORS.primary : COLORS.textSecondary
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === "grid" && styles.toggleButtonActive,
            ]}
            onPress={() => onViewModeChange("grid")}
          >
            <Ionicons
              name="grid-outline"
              size={20}
              color={
                viewMode === "grid" ? COLORS.primary : COLORS.textSecondary
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DocumentsHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
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
    padding: SPACING.xs,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
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
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginRight: 4,
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 6,
    padding: 2,
  },
  toggleButton: {
    padding: SPACING.sm,
    borderRadius: 4,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.primary,
  },
});
