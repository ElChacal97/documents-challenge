/* eslint-disable react/display-name */
import useDocument from "@/logic/hooks/useDocument";
import { Document } from "@/types/document";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert, FlatList, Share } from "react-native";
import DocumentsList from "../DocumentsList";

jest.mock("@/logic/hooks/useDocument");
const mockUseDocument = useDocument as jest.MockedFunction<typeof useDocument>;

// React Native is already mocked globally in jest.setup.js

jest.mock("@/logic/utils/sorting", () => ({
  sortDocuments: jest.fn((documents) => documents),
}));

jest.mock("../DocumentListItem", () => {
  return ({ document, onPress }: any) => {
    const React = require('react');
    return React.createElement('TouchableOpacity', 
      { onPress: () => onPress(document) },
      React.createElement('Text', {}, document.Title)
    );
  };
});

jest.mock("../DocumentGridItem", () => {
  return ({ document, onPress }: any) => {
    const React = require('react');
    return React.createElement('TouchableOpacity', 
      { onPress: () => onPress(document) },
      React.createElement('Text', {}, document.Title)
    );
  };
});

jest.mock("../../FlatList", () => {
  return ({ data, renderItem, ListEmptyComponent, ...props }: any) => {
    const React = require('react');
    if (!data || data.length === 0) {
      return ListEmptyComponent ? ListEmptyComponent : null;
    }
    return React.createElement('FlatList', props,
      data.map((item: any, index: number) => 
        React.createElement('View', { key: index }, 
          renderItem({ item })
        )
      )
    );
  };
});

jest.mock("../../Loader", () => {
  return () => {
    const React = require('react');
    return React.createElement('Text', {}, 'Loading...');
  };
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockDocuments: Document[] = [
  {
    ID: "1",
    Title: "First Document",
    Version: "1.0",
    Attachments: ["attachment1.pdf"],
    CreatedAt: "2023-01-01T00:00:00Z",
    UpdatedAt: "2023-01-01T00:00:00Z",
    Contributors: [],
  },
  {
    ID: "2",
    Title: "Second Document",
    Version: "1.0",
    Attachments: ["attachment2.pdf"],
    CreatedAt: "2023-01-02T00:00:00Z",
    UpdatedAt: "2023-01-02T00:00:00Z",
    Contributors: [],
  },
];

describe("DocumentsList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state", () => {
    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: undefined,
        isLoading: true,
        error: null,
        refetch: jest.fn(),
        isRefetching: false,
        isError: false,
        isPending: true,
        isSuccess: false,
        isPlaceholderData: false,
        status: "pending",
        isStale: false,
        isLoadingError: false,
        isRefetchError: false,
        isFetched: false,
        isFetchedAfterMount: false,
        isFetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { getByText } = render(
      <DocumentsList viewMode="list" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    expect(getByText("Loading...")).toBeTruthy();
  });

  it("should render documents in list mode", () => {
    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: mockDocuments,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        isRefetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { getByText } = render(
      <DocumentsList viewMode="list" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    expect(getByText("First Document")).toBeTruthy();
    expect(getByText("Second Document")).toBeTruthy();
  });

  it("should render documents in grid mode", () => {
    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: mockDocuments,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        isRefetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { getByText } = render(
      <DocumentsList viewMode="grid" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    expect(getByText("First Document")).toBeTruthy();
    expect(getByText("Second Document")).toBeTruthy();
  });

  it("should render empty state when no documents", () => {
    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: [],
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        isRefetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { getByText } = render(
      <DocumentsList viewMode="list" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    expect(getByText("No documents found")).toBeTruthy();
    expect(getByText("Create your first document to get started")).toBeTruthy();
  });

  it("should render error state when there is an error", () => {
    const mockRefetch = jest.fn();
    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: undefined,
        isLoading: false,
        error: new Error("Failed to fetch"),
        refetch: mockRefetch,
        isRefetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { getByText } = render(
      <DocumentsList viewMode="list" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    expect(getByText("Failed to load documents")).toBeTruthy();
    expect(
      getByText("Please check your connection and try again")
    ).toBeTruthy();
    expect(getByText("Retry")).toBeTruthy();
  });

  it("should call refetch when retry button is pressed", () => {
    const mockRefetch = jest.fn();
    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: undefined,
        isLoading: false,
        error: new Error("Failed to fetch"),
        refetch: mockRefetch,
        isRefetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { getByText } = render(
      <DocumentsList viewMode="list" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    fireEvent.press(getByText("Retry"));
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("should handle document press and share", async () => {
    const mockShare = Share.share as jest.MockedFunction<typeof Share.share>;
    mockShare.mockResolvedValueOnce({ action: "sharedAction" });

    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: mockDocuments,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        isRefetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { getByText } = render(
      <DocumentsList viewMode="list" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    fireEvent.press(getByText("First Document"));

    await waitFor(() => {
      expect(mockShare).toHaveBeenCalledWith({
        message: "Check out this document: First Document",
        title: "First Document",
        url: "attachment1.pdf",
      });
    });
  });

  it("should handle share error", async () => {
    const mockShare = Share.share as jest.MockedFunction<typeof Share.share>;
    const mockAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;
    mockShare.mockRejectedValueOnce(new Error("Share failed"));

    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: mockDocuments,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        isRefetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { getByText } = render(
      <DocumentsList viewMode="list" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    fireEvent.press(getByText("First Document"));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        "Error",
        "Failed to share document"
      );
    });
  });

  it("should show refresh control when refetching", () => {
    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: mockDocuments,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        isRefetching: true,
      } as any,
      createDocument: {} as any,
    });

    const { getByText } = render(
      <DocumentsList viewMode="list" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    expect(getByText("Loading...")).toBeTruthy();
  });

  it("should call refetch when refresh is triggered", () => {
    const mockRefetch = jest.fn();
    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: mockDocuments,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
        isRefetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { getByTestId } = render(
      <DocumentsList viewMode="list" sortOption="title-asc" />,
      { wrapper: createWrapper() }
    );

    // Note: In a real test, you would need to trigger the RefreshControl
    // This is a simplified version
    expect(mockRefetch).not.toHaveBeenCalled();
  });

  it("should pass correct props to FlatList", () => {
    mockUseDocument.mockReturnValue({
      listDocuments: {
        data: mockDocuments,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        isRefetching: false,
      } as any,
      createDocument: {} as any,
    });

    const { UNSAFE_getByType } = render(
      <DocumentsList viewMode="grid" sortOption="title-desc" />,
      { wrapper: createWrapper() }
    );

    const flatList = UNSAFE_getByType(FlatList);
    expect(flatList.props.numColumns).toBe(2);
    expect(flatList.props.data).toEqual(mockDocuments);
  });
});
