import { getDocumentsRequest } from "@/logic/client/Document";
import { CreateDocumentRequest, OkResponse } from "@/types/document";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useDocument = () => {
  const client = useQueryClient();
  const listDocuments = useQuery({
    queryKey: ["document"],
    queryFn: () => getDocumentsRequest({ queryKey: ["document"] }),
  });

  const createDocument = useMutation({
    mutationFn: (document: CreateDocumentRequest) =>
      createDocumentRequest(document),
  });

  const createDocumentRequest = async (
    document: CreateDocumentRequest
  ): Promise<OkResponse> => {
    try {
      setTimeout(() => {
        client.setQueryData(["document"], (old: Document[]) => [
          ...old,
          {
            ...document,
            ID: Math.random().toString(36).substring(2, 15),
            Contributors: [],
            CreatedAt: new Date().toISOString(),
            UpdatedAt: new Date().toISOString(),
          },
        ]);
      }, 1000);
    } catch (error) {
      console.error("Error creating document:", error);
      return { ok: false };
    }
    return { ok: true };
  };

  return {
    listDocuments,
    createDocument,
  };
};

export default useDocument;
