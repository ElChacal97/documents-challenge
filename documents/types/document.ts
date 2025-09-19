export interface Document {
  ID: string;
  Attachments: string[];
  Contributors?: {
    ID: string;
    Name: string;
  }[];
  Title: string;
  CreatedAt: string;
  Version: string;
  UpdatedAt: string;
}

export interface CreateDocumentRequest {
  Title: string;
  Version: string;
  Attachments: string[];
}

export interface NotificationData {
  type: "document_created" | "document_updated" | "document_deleted";
  document: Document;
  timestamp: string;
}

export interface OkResponse {
  ok: boolean;
}
