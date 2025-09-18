export interface Document {
  ID: string;
  attachments: string[];
  contributors: {
    id: string;
    name: string;
  }[];
  title: string;
  createdAt: string;
  version: string;
  updatedAt: string;
}

export interface CreateDocumentRequest {
  title: string;
  content: string;
}

export interface NotificationData {
  type: "document_created" | "document_updated" | "document_deleted";
  document: Document;
  timestamp: string;
}
