import { SortOption } from "@/components/documents/modals/SortDocumentModal";
import { Document } from "@/types/document";
import { sortDocuments } from "../sorting";

// Mock documents for testing
const mockDocuments: Document[] = [
  {
    ID: "1",
    Title: "Zebra Document",
    Version: "1.0",
    Attachments: ["attachment1.pdf"],
    CreatedAt: "2023-01-01T00:00:00Z",
    UpdatedAt: "2023-01-01T00:00:00Z",
    Contributors: [],
  },
  {
    ID: "2",
    Title: "Apple Document",
    Version: "1.0",
    Attachments: ["attachment2.pdf"],
    CreatedAt: "2023-01-02T00:00:00Z",
    UpdatedAt: "2023-01-02T00:00:00Z",
    Contributors: [],
  },
  {
    ID: "3",
    Title: "Banana Document",
    Version: "1.0",
    Attachments: ["attachment3.pdf"],
    CreatedAt: "2023-01-03T00:00:00Z",
    UpdatedAt: "2023-01-03T00:00:00Z",
    Contributors: [],
  },
];

describe("sortDocuments", () => {
  it("should return empty array when documents is empty", () => {
    const result = sortDocuments([], "title-asc");
    expect(result).toEqual([]);
  });

  it("should return empty array when documents is null", () => {
    const result = sortDocuments(null as any, "title-asc");
    expect(result).toEqual([]);
  });

  it("should return empty array when documents is undefined", () => {
    const result = sortDocuments(undefined as any, "title-asc");
    expect(result).toEqual([]);
  });

  describe("title sorting", () => {
    it("should sort documents by title ascending", () => {
      const result = sortDocuments(mockDocuments, "title-asc");
      expect(result[0].Title).toBe("Apple Document");
      expect(result[1].Title).toBe("Banana Document");
      expect(result[2].Title).toBe("Zebra Document");
    });

    it("should sort documents by title descending", () => {
      const result = sortDocuments(mockDocuments, "title-desc");
      expect(result[0].Title).toBe("Zebra Document");
      expect(result[1].Title).toBe("Banana Document");
      expect(result[2].Title).toBe("Apple Document");
    });
  });

  describe("date sorting", () => {
    it("should sort documents by creation date ascending", () => {
      const result = sortDocuments(mockDocuments, "date-asc");
      expect(result[0].ID).toBe("1");
      expect(result[1].ID).toBe("2");
      expect(result[2].ID).toBe("3");
    });

    it("should sort documents by creation date descending", () => {
      const result = sortDocuments(mockDocuments, "date-desc");
      expect(result[0].ID).toBe("3");
      expect(result[1].ID).toBe("2");
      expect(result[2].ID).toBe("1");
    });
  });

  describe("updated date sorting", () => {
    it("should sort documents by updated date ascending", () => {
      const result = sortDocuments(mockDocuments, "updated-asc");
      expect(result[0].ID).toBe("1");
      expect(result[1].ID).toBe("2");
      expect(result[2].ID).toBe("3");
    });

    it("should sort documents by updated date descending", () => {
      const result = sortDocuments(mockDocuments, "updated-desc");
      expect(result[0].ID).toBe("3");
      expect(result[1].ID).toBe("2");
      expect(result[2].ID).toBe("1");
    });
  });

  it("should return original array for unknown sort option", () => {
    const result = sortDocuments(mockDocuments, "unknown" as SortOption);
    expect(result).toEqual(mockDocuments);
  });

  it("should not mutate the original array", () => {
    const originalDocuments = [...mockDocuments];
    sortDocuments(mockDocuments, "title-asc");
    expect(mockDocuments).toEqual(originalDocuments);
  });

  it("should handle documents with same titles", () => {
    const documentsWithSameTitle: Document[] = [
      {
        ID: "1",
        Title: "Same Title",
        Version: "1.0",
        Attachments: [],
        CreatedAt: "2023-01-01T00:00:00Z",
        UpdatedAt: "2023-01-01T00:00:00Z",
        Contributors: [],
      },
      {
        ID: "2",
        Title: "Same Title",
        Version: "1.0",
        Attachments: [],
        CreatedAt: "2023-01-02T00:00:00Z",
        UpdatedAt: "2023-01-02T00:00:00Z",
        Contributors: [],
      },
    ];

    const result = sortDocuments(documentsWithSameTitle, "title-asc");
    expect(result).toHaveLength(2);
    expect(result[0].Title).toBe("Same Title");
    expect(result[1].Title).toBe("Same Title");
  });
});
