import { SortOption } from "@/components/documents/modals/SortDocumentModal";
import { Document } from "@/types/document";

export const sortDocuments = (
  documents: Document[],
  sortOption: SortOption
): Document[] => {
  if (!documents || documents.length === 0) return [];

  const sortedDocuments = [...documents];

  switch (sortOption) {
    case "title-asc":
      return sortedDocuments.sort((a, b) => a.Title.localeCompare(b.Title));

    case "title-desc":
      return sortedDocuments.sort((a, b) => b.Title.localeCompare(a.Title));

    case "date-asc":
      return sortedDocuments.sort(
        (a, b) =>
          new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime()
      );

    case "date-desc":
      return sortedDocuments.sort(
        (a, b) =>
          new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
      );

    case "updated-asc":
      return sortedDocuments.sort(
        (a, b) =>
          new Date(a.UpdatedAt).getTime() - new Date(b.UpdatedAt).getTime()
      );

    case "updated-desc":
      return sortedDocuments.sort(
        (a, b) =>
          new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime()
      );

    default:
      return sortedDocuments;
  }
};
