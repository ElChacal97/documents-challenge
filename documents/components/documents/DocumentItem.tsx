import { ViewMode } from "@/app/documents/documentsListScreen";
import { Document } from "@/types/document";
import React from "react";
import DocumentGridItem from "./DocumentGridItem";
import DocumentListItem from "./DocumentListItem";

interface DocumentItemProps {
  document: Document;
  onPress: (document: Document) => void;
  viewMode: ViewMode;
}

const DocumentItem = ({ document, onPress, viewMode }: DocumentItemProps) => {
  return (
    <>
      {viewMode === "list" ? (
        <DocumentListItem document={document} onPress={onPress} />
      ) : (
        <DocumentGridItem document={document} onPress={onPress} />
      )}
    </>
  );
};

export default DocumentItem;
