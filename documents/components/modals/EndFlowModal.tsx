import React from "react";
import { Modal, StyleSheet, Text } from "react-native";

import { COLORS } from "@/constants/theme";
import { useEndFlowModal } from "../../contexts/EndFlowModalContext";

import { Ionicons } from "@expo/vector-icons";
import Button from "../Button";
import ModalCard from "./ModalCard";

const EndFlowModal = (): React.ReactNode => {
  const {
    state: { message, title, type, visible },
    dispatch,
  } = useEndFlowModal();

  const source =
    type === "success" ? (
      <Ionicons name="checkmark-circle" size={70} color={COLORS.success} />
    ) : (
      <Ionicons name="close-circle" size={70} color={COLORS.error} />
    );

  const closeModal = () => {
    dispatch({ type: "SET_VISIBLE", setVisible: false });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent
    >
      <ModalCard closeModal={closeModal}>
        {source}
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{message}</Text>
        <Button style={styles.button} onPress={closeModal}>
          Close
        </Button>
      </ModalCard>
    </Modal>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 34,
  },
  titleText: {
    fontSize: 32,
    color: COLORS.text,
    marginTop: 10,
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 10,
  },
});

export default EndFlowModal;
