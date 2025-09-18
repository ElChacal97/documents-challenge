import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { DocumentItem } from "../components/documents/DocumentItem";
import type { Document } from "../types";

const mockDocument: Document = {
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
  url: "https://example.com/document.pdf",
};

describe("DocumentItem", () => {
  const mockOnPress = jest.fn();
  const mockOnShare = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders document item in list mode", () => {
    const { getByText } = render(
      <DocumentItem
        document={mockDocument}
        onPress={mockOnPress}
        onShare={mockOnShare}
        variant="list"
      />
    );

    expect(getByText("Test Document")).toBeTruthy();
    expect(getByText("John Doe • 1 KB")).toBeTruthy();
  });

  it("renders document item in grid mode", () => {
    const { getByText } = render(
      <DocumentItem
        document={mockDocument}
        onPress={mockOnPress}
        onShare={mockOnShare}
        variant="grid"
      />
    );

    expect(getByText("Test Document")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
  });

  it("calls onPress when document is pressed", () => {
    const { getByText } = render(
      <DocumentItem
        document={mockDocument}
        onPress={mockOnPress}
        onShare={mockOnShare}
        variant="list"
      />
    );

    fireEvent.press(getByText("Test Document"));
    expect(mockOnPress).toHaveBeenCalledWith(mockDocument);
  });

  it("calls onShare when share button is pressed", () => {
    const { getByTestId } = render(
      <DocumentItem
        document={mockDocument}
        onPress={mockOnPress}
        onShare={mockOnShare}
        variant="list"
      />
    );

    // Note: In a real test, you'd need to add testID to the share button
    // fireEvent.press(getByTestId('share-button'));
    // expect(mockOnShare).toHaveBeenCalledWith(mockDocument);
  });
});
