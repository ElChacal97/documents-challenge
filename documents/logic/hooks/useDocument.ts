import { getDocumentsRequest } from "@/logic/client/Document";
import { CreateDocumentRequest, OkResponse } from "@/types/document";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { documentLogic } from "../business/documentLogic";

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
        const errors = documentLogic.validateDocument(document);
        if (errors.length > 0) {
          throw new Error(errors.join(", "));
        }

        const newDoc = documentLogic.formatDocumentForCreation(document);

        client.setQueryData(["documents"], (old: Document[] = []) => [
          ...old,
          newDoc,
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
