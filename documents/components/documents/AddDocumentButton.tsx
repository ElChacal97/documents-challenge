import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";

interface AddDocumentButtonProps {
  onPress: () => void;
}

const AddDocumentButton = ({ onPress }: AddDocumentButtonProps) => {
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        onPress={onPress}
        leftIcon={<Ionicons name="add" size={24} color={COLORS.surface} />}
      >
        <Text style={styles.buttonText}>Add document</Text>
      </Button>
    </View>
  );
};

export default AddDocumentButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderColor: COLORS.border,
    borderWidth: 1,
    backgroundColor: COLORS.secondaryBackground,
  },
  button: {
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.md,
    borderRadius: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    marginLeft: SPACING.sm,
  },
});
