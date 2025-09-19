import { getDocumentsRequest } from "@/logic/client/Document";
import { CreateDocumentRequest, OkResponse } from "@/types/document";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useDocument = () => {
  const client = useQueryClient();
  const listDocuments = useQuery({
    queryKey: ["documents"],
    queryFn: () => getDocumentsRequest({ queryKey: ["documents"] }),
  });

  const createDocumentRequest = async (
    document: CreateDocumentRequest
  ): Promise<OkResponse> => {
    try {
      setTimeout(() => {
        client.setQueryData(["documents"], (old: Document[]) => [
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

  const createDocument = useMutation({
    mutationFn: (document: CreateDocumentRequest) =>
      createDocumentRequest(document),
  });

  return {
    listDocuments,
    createDocument,
  };
};

export default useDocument;
