import { API_CONFIG } from "@/constants/api";
import { Document } from "@/types/document";
import { request } from "../../api";
import { getDocumentsRequest } from "../Document";

// Mock the request function
jest.mock("../../api");

const mockRequest = request as jest.MockedFunction<typeof request>;

describe("Document client", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch documents successfully", async () => {
    const mockDocuments: Document[] = [
      {
        ID: "1",
        Title: "Test Document",
        Version: "1.0",
        Attachments: ["attachment1.pdf"],
        CreatedAt: "2023-01-01T00:00:00Z",
        UpdatedAt: "2023-01-01T00:00:00Z",
        Contributors: [],
      },
    ];

    mockRequest.mockResolvedValueOnce(mockDocuments);

    const result = await getDocumentsRequest({ queryKey: ["documents"] });

    expect(mockRequest).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.DOCUMENTS);
    expect(result).toEqual(mockDocuments);
  });

  it("should handle empty documents array", async () => {
    mockRequest.mockResolvedValueOnce([]);

    const result = await getDocumentsRequest({ queryKey: ["documents"] });

    expect(mockRequest).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.DOCUMENTS);
    expect(result).toEqual([]);
  });

  it("should propagate API errors", async () => {
    const error = new Error("API Error");
    mockRequest.mockRejectedValueOnce(error);

    await expect(
      getDocumentsRequest({ queryKey: ["documents"] })
    ).rejects.toThrow("API Error");
  });

  it("should use correct endpoint from config", async () => {
    mockRequest.mockResolvedValueOnce([]);

    await getDocumentsRequest({ queryKey: ["documents"] });

    expect(mockRequest).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.DOCUMENTS);
  });

  it("should handle documents with contributors", async () => {
    const mockDocuments: Document[] = [
      {
        ID: "1",
        Title: "Document with Contributors",
        Version: "1.0",
        Attachments: ["attachment1.pdf"],
        CreatedAt: "2023-01-01T00:00:00Z",
        UpdatedAt: "2023-01-01T00:00:00Z",
        Contributors: [
          {
            ID: "user1",
            Name: "John Doe",
          },
          {
            ID: "user2",
            Name: "Jane Smith",
          },
        ],
      },
    ];

    mockRequest.mockResolvedValueOnce(mockDocuments);

    const result = await getDocumentsRequest({ queryKey: ["documents"] });

    expect(result).toEqual(mockDocuments);
    expect(result[0].Contributors).toHaveLength(2);
  });
});
