import { CreateDocumentRequest, Document } from "@/types/document";

export const documentLogic = {
  generateDocumentId(): string {
    return Math.random().toString(36).substring(2, 15);
  },

  formatDocumentForCreation(doc: CreateDocumentRequest): Document {
    return {
      ...doc,
      ID: Math.random().toString(36).substring(2, 15),
      Contributors: [],
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    };
  },

  validateDocument(doc: CreateDocumentRequest): string[] {
    const errors = [];
    if (!doc.Title.trim()) errors.push("Title is required");
    if (!doc.Version.trim()) errors.push("Version is required");
    return errors;
  },
};
