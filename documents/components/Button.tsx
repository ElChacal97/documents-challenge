import { BORDER_RADIUS, COLORS } from "@/constants/theme";
import React, { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

export type ButtonProps = PressableProps &
  PropsWithChildren & {
    onPress: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    textStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
  };

const Button: React.FC<ButtonProps> = ({
  onPress,
  disabled = false,
  isLoading = false,
  children,
  textStyle,
  style,
  ...props
}) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.submitButton,
        {
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.background} />
      ) : (
        <>
          <Text style={[styles.submitButtonText, textStyle]}>{children}</Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: COLORS.primary,
    width: "100%",
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  submitButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
