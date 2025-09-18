import { API_CONFIG } from "@/constants/api";
import { CreateDocumentRequest, Document } from "@/types/document";
import { request } from "../api";

export const getDocumentsRequest = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<Document[]> => {
  const response = await request<Document[]>(API_CONFIG.ENDPOINTS.DOCUMENTS);
  console.log("response", response);
  return response;
};

export const createDocumentRequest = async (
  document: CreateDocumentRequest
): Promise<Document> => {
  const response = await request<Document>(
    API_CONFIG.ENDPOINTS.CREATE_DOCUMENT,
    {
      method: "POST",
      body: JSON.stringify(document),
    }
  );
  return response;
};
