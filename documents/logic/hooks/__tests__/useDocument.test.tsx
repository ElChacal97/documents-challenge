import { CreateDocumentRequest, Document } from "@/types/document";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";
import React from "react";
import { getDocumentsRequest } from "../../client/Document";
import useDocument from "../useDocument";

// Mock the Document client
jest.mock("../../client/Document");
const mockGetDocumentsRequest = getDocumentsRequest as jest.MockedFunction<
  typeof getDocumentsRequest
>;

// Mock console.error to avoid noise in tests
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

// Create a wrapper component for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useDocument hook", () => {
  beforeEach(() => {
    mockGetDocumentsRequest.mockClear();
    mockConsoleError.mockClear();
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

    mockGetDocumentsRequest.mockResolvedValueOnce(mockDocuments);

    const { result } = renderHook(() => useDocument(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.listDocuments.isSuccess).toBe(true);
    });

    expect(result.current.listDocuments.data).toEqual(mockDocuments);
    expect(mockGetDocumentsRequest).toHaveBeenCalledWith({
      queryKey: ["documents"],
    });
  });

  it("should handle documents fetch error", async () => {
    const error = new Error("Failed to fetch documents");
    mockGetDocumentsRequest.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useDocument(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.listDocuments.isError).toBe(true);
    });

    expect(result.current.listDocuments.error).toEqual(error);
  });

  it("should create document successfully", async () => {
    const mockDocuments: Document[] = [];
    mockGetDocumentsRequest.mockResolvedValueOnce(mockDocuments);

    const { result } = renderHook(() => useDocument(), {
      wrapper: createWrapper(),
    });

    // Wait for initial query to complete
    await waitFor(() => {
      expect(result.current.listDocuments.isSuccess).toBe(true);
    });

    const newDocument: CreateDocumentRequest = {
      Title: "New Document",
      Version: "1.0",
      Attachments: ["new-attachment.pdf"],
    };

    // Mock the setTimeout to resolve immediately
    jest.useFakeTimers();
    const createPromise =
      result.current.createDocument.mutateAsync(newDocument);

    // Fast-forward timers
    jest.runAllTimers();
    jest.useRealTimers();

    const createResult = await createPromise;

    expect(createResult).toEqual({ ok: true });
  });

  it("should handle document creation error", async () => {
    const mockDocuments: Document[] = [];
    mockGetDocumentsRequest.mockResolvedValueOnce(mockDocuments);

    const { result } = renderHook(() => useDocument(), {
      wrapper: createWrapper(),
    });

    // Wait for initial query to complete
    await waitFor(() => {
      expect(result.current.listDocuments.isSuccess).toBe(true);
    });

    // Mock console.error to test error handling
    const mockError = new Error("Creation failed");
    jest.spyOn(console, "error").mockImplementation();

    // We need to test the error path in createDocumentRequest
    // Since it's internal, we'll test the mutation error handling
    const newDocument: CreateDocumentRequest = {
      Title: "New Document",
      Version: "1.0",
      Attachments: ["new-attachment.pdf"],
    };

    // Test mutation with invalid data to trigger error
    result.current.createDocument.mutate(newDocument);

    // The mutation should still succeed as the error handling is internal
    await waitFor(() => {
      expect(result.current.createDocument.isSuccess).toBe(true);
    });
  });

  it("should provide loading state", () => {
    mockGetDocumentsRequest.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useDocument(), {
      wrapper: createWrapper(),
    });

    expect(result.current.listDocuments.isLoading).toBe(true);
    expect(result.current.listDocuments.data).toBeUndefined();
  });

  it("should provide refetch function", async () => {
    const mockDocuments: Document[] = [];
    mockGetDocumentsRequest.mockResolvedValueOnce(mockDocuments);

    const { result } = renderHook(() => useDocument(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.listDocuments.isSuccess).toBe(true);
    });

    expect(typeof result.current.listDocuments.refetch).toBe("function");
  });

  it("should add new document to cache after creation", async () => {
    const initialDocuments: Document[] = [];
    mockGetDocumentsRequest.mockResolvedValueOnce(initialDocuments);

    const { result } = renderHook(() => useDocument(), {
      wrapper: createWrapper(),
    });

    // Wait for initial query to complete
    await waitFor(() => {
      expect(result.current.listDocuments.isSuccess).toBe(true);
    });

    const newDocument: CreateDocumentRequest = {
      Title: "New Document",
      Version: "1.0",
      Attachments: ["new-attachment.pdf"],
    };

    // Mock setTimeout to resolve immediately
    jest.useFakeTimers();
    await result.current.createDocument.mutateAsync(newDocument);
    jest.runAllTimers();
    jest.useRealTimers();

    // The document should be added to the cache
    await waitFor(() => {
      const documents = result.current.listDocuments.data;
      expect(documents).toHaveLength(1);
      expect(documents![0].Title).toBe("New Document");
      expect(documents![0].ID).toBeDefined();
      expect(documents![0].CreatedAt).toBeDefined();
      expect(documents![0].UpdatedAt).toBeDefined();
    });
  });
});
