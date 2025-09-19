import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SortOption } from "./modals/SortDocumentModal";

interface DocumentsListHeaderProps {
  onSortPress: () => void;
  onViewModeChange: (mode: "list" | "grid") => void;
  viewMode: "list" | "grid";
  currentSort?: SortOption;
}

const DocumentsListHeader = ({
  onSortPress,
  onViewModeChange,
  viewMode,
  currentSort,
}: DocumentsListHeaderProps) => {
  const getSortDisplayText = (sortOption?: SortOption) => {
    if (!sortOption) return "Sort by";

    const sortLabels: Record<SortOption, string> = {
      "title-asc": "Title A-Z",
      "title-desc": "Title Z-A",
      "date-asc": "Date (Oldest)",
      "date-desc": "Date (Newest)",
      "updated-asc": "Updated (Oldest)",
      "updated-desc": "Updated (Newest)",
    };

    return sortLabels[sortOption] || "Sort by";
  };
  return (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.sortButton} onPress={onSortPress}>
        <FontAwesome6 name="sort" size={16} color={COLORS.icon} />
        <Text style={styles.sortText}>{getSortDisplayText(currentSort)}</Text>
        <Ionicons
          name="chevron-down-outline"
          size={16}
          color={COLORS.icon}
          style={styles.sortIcon}
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
            color={viewMode === "list" ? COLORS.primary : COLORS.icon}
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
            color={viewMode === "grid" ? COLORS.primary : COLORS.icon}
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
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  sortText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginHorizontal: SPACING.md,
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderColor: COLORS.border,
    borderWidth: 1,
    width: 150,
  },
  toggleButton: {
    padding: SPACING.sm,
    backgroundColor: COLORS.secondaryBackground,
    borderRadius: BORDER_RADIUS.md,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: {
    backgroundColor: COLORS.background,
  },
  sortIcon: {
    borderColor: COLORS.border,
    borderLeftWidth: 2,
    paddingLeft: SPACING.sm,
  },
});
