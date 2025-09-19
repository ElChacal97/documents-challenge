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
  Timestamp: string;
  UserID: string;
  UserName: string;
  DocumentID: string;
  DocumentTitle: string;
}

export interface OkResponse {
  ok: boolean;
}
