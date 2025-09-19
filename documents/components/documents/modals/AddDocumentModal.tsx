import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DrawerModal from "../../modals/DrawerModal";

interface SortModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SortModal = ({ isVisible, onClose }: SortModalProps) => {
  return (
    <DrawerModal visible={isVisible} onCloseModal={onClose} modalHeight={600}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Document</Text>
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
});
