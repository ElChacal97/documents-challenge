import { apiService } from "../logic/api";

// Mock fetch
global.fetch = jest.fn();

describe("API Service", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe("getDocuments", () => {
    it("should fetch documents successfully", async () => {
      const mockDocuments = [
        {
          id: "1",
          title: "Test Document",
          content: "Test content",
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          author: {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
          },
          type: "pdf",
          size: 1024,
        },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            data: { data: mockDocuments },
            success: true,
          }),
      });

      const result = await apiService.getDocuments();
      expect(result).toEqual(mockDocuments);
      expect(fetch).toHaveBeenCalledWith(
        "https://frontend-challenge.vercel.app/api/documents",
        expect.any(Object)
      );
    });

    it("should handle API errors", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(apiService.getDocuments()).rejects.toThrow("Network error");
    });
  });

  describe("createDocument", () => {
    it("should create document successfully", async () => {
      const newDocument = {
        id: "2",
        title: "New Document",
        content: "New content",
        createdAt: "2024-01-02T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
        author: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
        },
        type: "txt" as const,
        size: 512,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            data: newDocument,
            success: true,
          }),
      });

      const result = await apiService.createDocument({
        title: "New Document",
        content: "New content",
        type: "txt",
      });

      expect(result).toEqual(newDocument);
      expect(fetch).toHaveBeenCalledWith(
        "https://frontend-challenge.vercel.app/api/documents",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            title: "New Document",
            content: "New content",
            type: "txt",
          }),
        })
      );
    });
  });
});
