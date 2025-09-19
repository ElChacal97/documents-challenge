import Button from "@/components/Button";
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { useEndFlowModal } from "@/contexts/EndFlowModalContext";
import useDocument from "@/logic/hooks/useDocument";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
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
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("");
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null
  );
  const ref = useRef<Modalize>(null);
  const { createDocument } = useDocument();
  const { showSuccess, showError } = useEndFlowModal();

  const handleChooseFile = () => {
    DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    }).then((result) => {
      setFile(result.assets?.[0] ?? null);
    });
  };

  const handleSubmit = () => {
    createDocument.mutateAsync(
      {
        Title: title,
        Version: version,
        Attachments: [file?.uri ?? ""],
      },
      {
        onSuccess: () => {
          showSuccess({
            title: "Document created successfully",
            message: "Document created successfully",
          });
          ref.current?.close();
        },
        onError: () => {
          showError({
            title: "Failed to create document",
            message: "Failed to create document, please try again",
          });
        },
      }
    );
  };

  const resetForm = () => {
    setTitle("");
    setVersion("");
    setFile(null);
  };

  const handleClose = () => {
    resetForm();
    ref.current?.close();
    onClose();
  };

  const handleVersionChange = (text: string) => {
    let sanitized = text.replace(/[^0-9.]/g, "");
    sanitized = sanitized.replace(/\.{2,}/g, ".").replace(/^\.+/, "");
    setVersion(sanitized);
  };

  const closeModal = () => {
    resetForm();
    onClose();
  };

  return (
    <DrawerModal
      ref={ref}
      visible={isVisible}
      onCloseModal={closeModal}
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
              placeholder="Title"
              placeholderTextColor={COLORS.textSecondary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Version</Text>
            <TextInput
              style={styles.input}
              placeholder="Version"
              placeholderTextColor={COLORS.textSecondary}
              value={version}
              inputMode="text"
              onChangeText={handleVersionChange}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>File</Text>
            <TouchableOpacity
              style={styles.fileButton}
              onPress={handleChooseFile}
            >
              <Ionicons name="document" size={24} color={COLORS.primary} />
              <Text style={styles.fileButtonText}>Choose file</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          style={styles.submitButton}
          disabled={!title || !version}
          isLoading={createDocument.isPending}
          onPress={handleSubmit}
        >
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
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: SPACING.sm,
    width: "40%",
  },
  fileButtonText: {
    color: COLORS.primary,
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
