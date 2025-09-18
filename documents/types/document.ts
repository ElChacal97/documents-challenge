export interface Document {
  ID: string;
  Attachments: string[];
  Contributors: {
    ID: string;
    Name: string;
  }[];
  Title: string;
  CreatedAt: string;
  Version: string;
  UpdatedAt: string;
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
