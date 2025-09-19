import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DocumentsListHeaderProps {
  onSortPress: () => void;
  onViewModeChange: (mode: "list" | "grid") => void;
  viewMode: "list" | "grid";
}

const DocumentsListHeader = ({
  onSortPress,
  onViewModeChange,
  viewMode,
}: DocumentsListHeaderProps) => {
  return (
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
            color={viewMode === "list" ? COLORS.primary : COLORS.textSecondary}
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
            color={viewMode === "grid" ? COLORS.primary : COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentsListHeader;

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
