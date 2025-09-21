import React from "react";
import { render, fireEvent, screen } from "../../../test-utils";
import DocumentListItem from "../DocumentListItem";
import DocumentGridItem from "../DocumentGridItem";
import DocumentItem from "../DocumentItem";
import { Document } from "@/types/document";

jest.mock("@/logic/utils/string", () => ({
  formatRelativeTime: jest.fn((date) => "2 days ago"),
}));

const mockDocument: Document = {
  ID: "1",
  Title: "Test Document 1",
  Attachments: ["https://example.com/doc1.pdf"],
  UpdatedAt: "2024-06-01T12:00:00Z",
  CreatedAt: "2024-06-01T10:00:00Z",
  Version: "1.0",
  Contributors: [
    { ID: "user1", Name: "John Doe" },
    { ID: "user2", Name: "Jane Smith" },
  ],
};

describe("DocumentListItem", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders document information correctly", () => {
    render(<DocumentListItem document={mockDocument} onPress={mockOnPress} />);

    expect(screen.getByText("Test Document 1")).toBeTruthy();
    expect(screen.getByText("Version 1.0")).toBeTruthy();
    expect(screen.getByText("2 days ago")).toBeTruthy();
    expect(screen.getByText("Contributors")).toBeTruthy();
    expect(screen.getByText("Attachments")).toBeTruthy();
    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("Jane Smith")).toBeTruthy();
    expect(screen.getByText("https://example.com/doc1.pdf")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    render(<DocumentListItem document={mockDocument} onPress={mockOnPress} />);

    fireEvent.press(screen.getByText("Test Document 1"));
    expect(mockOnPress).toHaveBeenCalledWith(mockDocument);
  });

  it("handles document without contributors", () => {
    const documentWithoutContributors = {
      ...mockDocument,
      Contributors: undefined,
    };

    render(
      <DocumentListItem
        document={documentWithoutContributors}
        onPress={mockOnPress}
      />
    );

    expect(screen.getByText("Test Document 1")).toBeTruthy();
    expect(screen.getByText("Contributors")).toBeTruthy();
  });

  it("handles document with multiple attachments", () => {
    const documentWithMultipleAttachments = {
      ...mockDocument,
      Attachments: [
        "https://example.com/doc1.pdf",
        "https://example.com/doc1.docx",
      ],
    };

    render(
      <DocumentListItem
        document={documentWithMultipleAttachments}
        onPress={mockOnPress}
      />
    );

    expect(screen.getByText("https://example.com/doc1.pdf")).toBeTruthy();
    expect(screen.getByText("https://example.com/doc1.docx")).toBeTruthy();
  });
});

describe("DocumentGridItem", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders document information correctly", () => {
    render(<DocumentGridItem document={mockDocument} onPress={mockOnPress} />);

    expect(screen.getByText("Test Document 1")).toBeTruthy();
    expect(screen.getByText("Version 1.0")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    render(<DocumentGridItem document={mockDocument} onPress={mockOnPress} />);

    fireEvent.press(screen.getByText("Test Document 1"));
    expect(mockOnPress).toHaveBeenCalledWith(mockDocument);
  });

  it("truncates long titles", () => {
    const documentWithLongTitle = {
      ...mockDocument,
      Title:
        "This is a very long document title that should be truncated when displayed in grid view",
    };

    render(
      <DocumentGridItem
        document={documentWithLongTitle}
        onPress={mockOnPress}
      />
    );

    const titleElement = screen.getByText(documentWithLongTitle.Title);
    expect(titleElement.props.numberOfLines).toBe(2);
  });
});

describe("DocumentItem", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders DocumentListItem when viewMode is list", () => {
    render(
      <DocumentItem
        document={mockDocument}
        onPress={mockOnPress}
        viewMode="list"
      />
    );

    expect(screen.getByText("Test Document 1")).toBeTruthy();
    expect(screen.getByText("Contributors")).toBeTruthy();
    expect(screen.getByText("Attachments")).toBeTruthy();
  });

  it("renders DocumentGridItem when viewMode is grid", () => {
    render(
      <DocumentItem
        document={mockDocument}
        onPress={mockOnPress}
        viewMode="grid"
      />
    );

    expect(screen.getByText("Test Document 1")).toBeTruthy();
    expect(screen.getByText("Version 1.0")).toBeTruthy();
    // Should not show contributors and attachments in grid view
    expect(screen.queryByText("Contributors")).toBeNull();
    expect(screen.queryByText("Attachments")).toBeNull();
  });

  it("passes onPress to the correct child component", () => {
    render(
      <DocumentItem
        document={mockDocument}
        onPress={mockOnPress}
        viewMode="list"
      />
    );

    fireEvent.press(screen.getByText("Test Document 1"));
    expect(mockOnPress).toHaveBeenCalledWith(mockDocument);
  });
});
