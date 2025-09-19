import { API_CONFIG } from "@/constants/api";
import { Document } from "@/types/document";
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
