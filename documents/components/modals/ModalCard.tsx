import { BORDER_RADIUS, COLORS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  LayoutAnimation,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface Props {
  closeModal?: () => void;
  children?: React.ReactNode;
  modalStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  showCloseButton?: boolean;
  closeOnOverlayPress?: boolean;
}

const ModalCard = ({
  closeModal,
  children,
  modalStyle,
  overlayStyle,
  showCloseButton = true,
  closeOnOverlayPress = true,
}: Props): React.ReactNode => {
  const handleOnClose = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    closeModal?.();
  };

  return (
    <Pressable
      style={[styles.centeredView, overlayStyle]}
      onPress={closeOnOverlayPress ? handleOnClose : undefined}
    >
      <Pressable style={[styles.modalView, modalStyle]}>
        {showCloseButton && (
          <TouchableOpacity
            style={styles.closeContainer}
            onPress={handleOnClose}
          >
            <Ionicons name="close" size={22} color={COLORS.icon} />
          </TouchableOpacity>
        )}
        {children}
      </Pressable>
    </Pressable>
  );
};

export default ModalCard;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000b3",
  },
  modalView: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    width: "82%",
    maxHeight: "80%",
    alignItems: "center",
  },
  closeContainer: {
    width: 30,
    height: 30,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 10,
    left: 10,
    zIndex: 1000,
    elevation: 1000,
  },
});
