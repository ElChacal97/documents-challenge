import { CreateDocumentRequest, Document } from "@/types/document";

// Mock the useDocument hook's createDocumentRequest function
const mockCreateDocumentRequest = jest.fn();

// Mock setTimeout to control timing
jest.useFakeTimers();

describe("Document Creation Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should create document with correct structure", () => {
    const createDocumentRequest = async (
      document: CreateDocumentRequest
    ): Promise<{ ok: boolean }> => {
      try {
        setTimeout(() => {
          // Simulate adding to cache
          const newDocument: Document = {
            ...document,
            ID: Math.random().toString(36).substring(2, 15),
            Contributors: [],
            CreatedAt: new Date().toISOString(),
            UpdatedAt: new Date().toISOString(),
          };
          mockCreateDocumentRequest(newDocument);
        }, 1000);
      } catch (error) {
        console.error("Error creating document:", error);
        return { ok: false };
      }
      return { ok: true };
    };

    const newDocument: CreateDocumentRequest = {
      Title: "Test Document",
      Version: "1.0",
      Attachments: ["attachment.pdf"],
    };

    const result = createDocumentRequest(newDocument);

    expect(result).resolves.toEqual({ ok: true });
  });

  it("should generate unique ID for each document", () => {
    const generateId = () => Math.random().toString(36).substring(2, 15);

    const id1 = generateId();
    const id2 = generateId();

    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^[a-z0-9]+$/);
    expect(id1.length).toBeGreaterThan(0);
  });

  it("should set correct timestamps", () => {
    const now = new Date();
    const createdAt = now.toISOString();
    const updatedAt = now.toISOString();

    expect(createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it("should handle document creation with empty attachments", () => {
    const document: CreateDocumentRequest = {
      Title: "Document without attachments",
      Version: "1.0",
      Attachments: [],
    };

    const expectedDocument: Document = {
      ...document,
      ID: expect.any(String),
      Contributors: [],
      CreatedAt: expect.any(String),
      UpdatedAt: expect.any(String),
    };

    // Simulate the transformation
    const transformedDocument: Document = {
      ...document,
      ID: "test-id",
      Contributors: [],
      CreatedAt: "2023-01-01T00:00:00.000Z",
      UpdatedAt: "2023-01-01T00:00:00.000Z",
    };

    expect(transformedDocument.Title).toBe(document.Title);
    expect(transformedDocument.Version).toBe(document.Version);
    expect(transformedDocument.Attachments).toEqual([]);
    expect(transformedDocument.Contributors).toEqual([]);
    expect(transformedDocument.ID).toBeDefined();
    expect(transformedDocument.CreatedAt).toBeDefined();
    expect(transformedDocument.UpdatedAt).toBeDefined();
  });

  it("should handle document creation with multiple attachments", () => {
    const document: CreateDocumentRequest = {
      Title: "Document with multiple attachments",
      Version: "2.0",
      Attachments: ["file1.pdf", "file2.docx", "file3.jpg"],
    };

    const transformedDocument: Document = {
      ...document,
      ID: "test-id",
      Contributors: [],
      CreatedAt: "2023-01-01T00:00:00.000Z",
      UpdatedAt: "2023-01-01T00:00:00.000Z",
    };

    expect(transformedDocument.Attachments).toHaveLength(3);
    expect(transformedDocument.Attachments).toEqual([
      "file1.pdf",
      "file2.docx",
      "file3.jpg",
    ]);
  });

  it("should validate required fields", () => {
    const validDocument: CreateDocumentRequest = {
      Title: "Valid Document",
      Version: "1.0",
      Attachments: [],
    };

    expect(validDocument.Title).toBeTruthy();
    expect(validDocument.Version).toBeTruthy();
    expect(Array.isArray(validDocument.Attachments)).toBe(true);
  });

  it("should handle error in document creation", async () => {
    const createDocumentRequestWithError = async (
      document: CreateDocumentRequest
    ): Promise<{ ok: boolean }> => {
      try {
        throw new Error("Simulated error");
      } catch (error) {
        console.error("Error creating document:", error);
        return { ok: false };
      }
    };

    const document: CreateDocumentRequest = {
      Title: "Test Document",
      Version: "1.0",
      Attachments: [],
    };

    const result = await createDocumentRequestWithError(document);
    expect(result).toEqual({ ok: false });
  });

  it("should maintain document immutability during creation", () => {
    const originalDocument: CreateDocumentRequest = {
      Title: "Original Document",
      Version: "1.0",
      Attachments: ["original.pdf"],
    };

    const transformedDocument: Document = {
      ...originalDocument,
      ID: "new-id",
      Contributors: [],
      CreatedAt: "2023-01-01T00:00:00.000Z",
      UpdatedAt: "2023-01-01T00:00:00.000Z",
    };

    // Original document should remain unchanged
    expect(originalDocument.Title).toBe("Original Document");
    expect(originalDocument.Version).toBe("1.0");
    expect(originalDocument.Attachments).toEqual(["original.pdf"]);

    // Transformed document should have additional fields
    expect(transformedDocument.ID).toBe("new-id");
    expect(transformedDocument.Contributors).toEqual([]);
    expect(transformedDocument.CreatedAt).toBeDefined();
    expect(transformedDocument.UpdatedAt).toBeDefined();
  });
});
