import Button from "@/components/Button";
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import DrawerModal from "../../modals/DrawerModal";

interface AddDocumentModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddDocumentModal = ({ isVisible, onClose }: AddDocumentModalProps) => {
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const ref = useRef<Modalize>(null);

  const handleChooseFile = () => {};

  const handleSubmit = () => {
    // Logic will be added later
    console.log("Submit pressed", { name, version });
    ref.current?.close();
  };

  const handleClose = () => {
    ref.current?.close();
    onClose();
  };

  return (
    <DrawerModal
      ref={ref}
      visible={isVisible}
      onCloseModal={onClose}
      adjustToContentHeight
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Add document</Text>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={30} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Document informations</Text>

        <View style={styles.form}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Placeholder"
              placeholderTextColor={COLORS.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Version</Text>
            <TextInput
              style={styles.input}
              placeholder="Placeholder"
              placeholderTextColor={COLORS.textSecondary}
              value={version}
              onChangeText={setVersion}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>File</Text>
            <TouchableOpacity
              style={styles.fileButton}
              onPress={handleChooseFile}
            >
              <Text style={styles.fileButtonText}>Choose file</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Button>
      </View>
    </DrawerModal>
  );
};

export default AddDocumentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginBottom: SPACING.lg,
    fontWeight: "600",
  },
  form: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  fileButton: {
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fileButtonText: {
    color: "#2196F3",
    fontSize: FONT_SIZES.md,
    fontWeight: "500",
  },
  submitButton: {
    paddingVertical: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
});
