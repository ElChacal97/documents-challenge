import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import DrawerModal from "../../modals/DrawerModal";

export type SortOption =
  | "title-asc"
  | "title-desc"
  | "date-asc"
  | "date-desc"
  | "updated-asc"
  | "updated-desc";

interface SortModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSortSelect: (sortOption: SortOption) => void;
  currentSort: SortOption;
}

const SORT_OPTIONS: {
  value: SortOption;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { value: "title-asc", label: "Title A-Z", icon: "text-outline" },
  { value: "title-desc", label: "Title Z-A", icon: "text-outline" },
  {
    value: "date-asc",
    label: "Date Created (Oldest)",
    icon: "calendar-outline",
  },
  {
    value: "date-desc",
    label: "Date Created (Newest)",
    icon: "calendar-outline",
  },
  {
    value: "updated-asc",
    label: "Last Updated (Oldest)",
    icon: "time-outline",
  },
  {
    value: "updated-desc",
    label: "Last Updated (Newest)",
    icon: "time-outline",
  },
];

const SortModal = ({
  isVisible,
  onClose,
  onSortSelect,
  currentSort,
}: SortModalProps) => {
  const ref = useRef<Modalize>(null);
  const handleSortSelect = (sortOption: SortOption) => {
    onSortSelect(sortOption);
    ref.current?.close();
  };

  return (
    <DrawerModal
      ref={ref}
      visible={isVisible}
      onCloseModal={onClose}
      adjustToContentHeight
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sort Documents</Text>

        <View style={styles.optionsContainer}>
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                currentSort === option.value && styles.selectedOption,
              ]}
              onPress={() => handleSortSelect(option.value)}
            >
              <View style={styles.optionContent}>
                <Ionicons
                  name={option.icon}
                  size={20}
                  color={
                    currentSort === option.value ? COLORS.primary : COLORS.icon
                  }
                />
                <Text
                  style={[
                    styles.optionText,
                    currentSort === option.value && styles.selectedOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </View>
              {currentSort === option.value && (
                <Ionicons name="checkmark" size={20} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </DrawerModal>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  optionsContainer: {
    width: "100%",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  selectedOption: {
    backgroundColor: COLORS.secondaryBackground,
    borderColor: COLORS.primary,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginLeft: SPACING.md,
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
