import {
  createDocumentRequest,
  getDocumentsRequest,
} from "@/logic/client/Document";
import { CreateDocumentRequest } from "@/types/document";
import { useMutation, useQuery } from "@tanstack/react-query";

const useDocument = () => {
  const listDocuments = useQuery({
    queryKey: ["document"],
    queryFn: () => getDocumentsRequest({ queryKey: ["document"] }),
  });

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
