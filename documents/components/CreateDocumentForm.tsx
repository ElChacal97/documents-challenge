import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "../constants";
import { useCreateDocument } from "../hooks";
import type { Document } from "../types";

interface CreateDocumentFormProps {
  onSuccess: (document: Document) => void;
  onCancel: () => void;
}

const DOCUMENT_TYPES = [
  { value: "pdf", label: "PDF", icon: "📄" },
  { value: "doc", label: "Document", icon: "📝" },
  { value: "txt", label: "Text", icon: "📃" },
  { value: "image", label: "Image", icon: "🖼️" },
] as const;

export function CreateDocumentForm({
  onSuccess,
  onCancel,
}: CreateDocumentFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<Document["type"]>("txt");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createDocumentMutation = useCreateDocument();

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a document title");
      return;
    }

    if (!content.trim()) {
      Alert.alert("Error", "Please enter document content");
      return;
    }

    setIsSubmitting(true);

    try {
      const newDocument = await createDocumentMutation.mutateAsync({
        title: title.trim(),
        content: content.trim(),
        type,
      });

      onSuccess(newDocument);
    } catch (error) {
      console.error("Failed to create document:", error);
      Alert.alert("Error", "Failed to create document. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Document</Text>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
          disabled={isSubmitting}
        >
          <Text style={styles.saveButtonText}>
            {isSubmitting ? "Creating..." : "Create"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}>Document Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter document title"
            placeholderTextColor={COLORS.textSecondary}
            maxLength={100}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Document Type</Text>
          <View style={styles.typeContainer}>
            {DOCUMENT_TYPES.map((docType) => (
              <TouchableOpacity
                key={docType.value}
                style={[
                  styles.typeOption,
                  type === docType.value && styles.typeOptionSelected,
                ]}
                onPress={() => setType(docType.value)}
              >
                <Text style={styles.typeIcon}>{docType.icon}</Text>
                <Text
                  style={[
                    styles.typeLabel,
                    type === docType.value && styles.typeLabelSelected,
                  ]}
                >
                  {docType.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.textArea}
            value={content}
            onChangeText={setContent}
            placeholder="Enter document content..."
            placeholderTextColor={COLORS.textSecondary}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            maxLength={5000}
          />
          <Text style={styles.characterCount}>
            {content.length}/5000 characters
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cancelButton: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  saveButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
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
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  typeOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  typeOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + "10",
  },
  typeIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  typeLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  typeLabelSelected: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  textArea: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    minHeight: 120,
  },
  characterCount: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "right",
    marginTop: SPACING.xs,
  },
});
