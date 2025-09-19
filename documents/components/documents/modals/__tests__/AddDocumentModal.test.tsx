/* eslint-disable react/display-name */
import useDocument from "@/logic/hooks/useDocument";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import AddDocumentModal from "../AddDocumentModal";

jest.mock("@/logic/hooks/useDocument");
const mockUseDocument = useDocument as jest.MockedFunction<typeof useDocument>;

jest.mock("expo-document-picker", () => ({
  getDocumentAsync: jest.fn(),
}));

// Don't mock @tanstack/react-query - we want to use the real QueryClient for testing

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

describe("AddDocumentModal", () => {
  const mockOnClose = jest.fn();
  const mockCreateDocument = {
    mutate: jest.fn(),
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDocument.mockReturnValue({
      listDocuments: {} as any,
      createDocument: mockCreateDocument as any,
    });
  });

  it("should render modal when visible", () => {
    const { getByTestId } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    expect(getByTestId("modal")).toBeTruthy();
  });

  it("should not render modal when not visible", () => {
    const { queryByTestId } = render(
      <AddDocumentModal isVisible={false} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    expect(queryByTestId("modal")).toBeNull();
  });

  it("should close modal when close button is pressed", () => {
    const { getByTestId } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    fireEvent.press(getByTestId("close-button"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should render form fields", () => {
    const { getByPlaceholderText } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    expect(getByPlaceholderText("Enter document title")).toBeTruthy();
    expect(getByPlaceholderText("Enter version (e.g., 1.0)")).toBeTruthy();
  });

  it("should update title input", () => {
    const { getByPlaceholderText } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    const titleInput = getByPlaceholderText("Enter document title");
    fireEvent.changeText(titleInput, "Test Document");
    expect(titleInput.props.value).toBe("Test Document");
  });

  it("should update version input", () => {
    const { getByPlaceholderText } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    const versionInput = getByPlaceholderText("Enter version (e.g., 1.0)");
    fireEvent.changeText(versionInput, "2.0");
    expect(versionInput.props.value).toBe("2.0");
  });

  it("should show validation error for empty title", async () => {
    const { getByText, getByTestId } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    const submitButton = getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText("Title is required")).toBeTruthy();
    });
  });

  it("should show validation error for empty version", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    const titleInput = getByPlaceholderText("Enter document title");
    fireEvent.changeText(titleInput, "Test Document");

    const submitButton = getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText("Version is required")).toBeTruthy();
    });
  });

  it("should create document with valid data", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    const titleInput = getByPlaceholderText("Enter document title");
    const versionInput = getByPlaceholderText("Enter version (e.g., 1.0)");

    fireEvent.changeText(titleInput, "Test Document");
    fireEvent.changeText(versionInput, "1.0");

    const submitButton = getByTestId("submit-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockCreateDocument.mutate).toHaveBeenCalledWith({
        Title: "Test Document",
        Version: "1.0",
        Attachments: [],
      });
    });
  });

  it("should show loading state when creating document", () => {
    mockUseDocument.mockReturnValue({
      listDocuments: {} as any,
      createDocument: {
        ...mockCreateDocument,
        isPending: true,
      } as any,
    });

    const { getByText } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    expect(getByText("Creating...")).toBeTruthy();
  });

  it("should call onDocumentAdded when document is created successfully", async () => {
    mockUseDocument.mockReturnValue({
      listDocuments: {} as any,
      createDocument: {
        ...mockCreateDocument,
        isSuccess: true,
      } as any,
    });

    render(<AddDocumentModal isVisible={true} onClose={mockOnClose} />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it("should show error message when creation fails", () => {
    mockUseDocument.mockReturnValue({
      listDocuments: {} as any,
      createDocument: {
        ...mockCreateDocument,
        isError: true,
        error: new Error("Creation failed"),
      } as any,
    });

    const { getByText } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    expect(getByText("Failed to create document")).toBeTruthy();
  });

  it("should reset form when modal is closed", () => {
    const { getByPlaceholderText, rerender } = render(
      <AddDocumentModal isVisible={true} onClose={mockOnClose} />,
      { wrapper: createWrapper() }
    );

    const titleInput = getByPlaceholderText("Enter document title");
    fireEvent.changeText(titleInput, "Test Document");

    rerender(<AddDocumentModal isVisible={false} onClose={mockOnClose} />);

    rerender(<AddDocumentModal isVisible={true} onClose={mockOnClose} />);

    const newTitleInput = getByPlaceholderText("Enter document title");
    expect(newTitleInput.props.value).toBe("");
  });
});
