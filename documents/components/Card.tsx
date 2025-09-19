import { COLORS, SPACING } from "@/constants/theme";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  onPress: () => void;
}

const Card = ({ children, onPress, ...props }: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
      style={[styles.container, props.style]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Card;

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
});
