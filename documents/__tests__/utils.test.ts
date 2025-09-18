import {
  formatFileSize,
  formatRelativeTime,
  getFileTypeIcon,
  truncateText,
} from "../logic/utils";

describe("Utils", () => {
  describe("formatRelativeTime", () => {
    it("should format recent times correctly", () => {
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      expect(formatRelativeTime(oneMinuteAgo.toISOString())).toBe(
        "1 minute ago"
      );
      expect(formatRelativeTime(oneHourAgo.toISOString())).toBe("1 hour ago");
      expect(formatRelativeTime(oneDayAgo.toISOString())).toBe("1 day ago");
    });

    it("should handle just now", () => {
      const now = new Date();
      expect(formatRelativeTime(now.toISOString())).toBe("Just now");
    });
  });

  describe("formatFileSize", () => {
    it("should format file sizes correctly", () => {
      expect(formatFileSize(0)).toBe("0 Bytes");
      expect(formatFileSize(1024)).toBe("1 KB");
      expect(formatFileSize(1024 * 1024)).toBe("1 MB");
      expect(formatFileSize(1024 * 1024 * 1024)).toBe("1 GB");
    });
  });

  describe("getFileTypeIcon", () => {
    it("should return correct icons for file types", () => {
      expect(getFileTypeIcon("pdf")).toBe("📄");
      expect(getFileTypeIcon("doc")).toBe("📝");
      expect(getFileTypeIcon("txt")).toBe("📃");
      expect(getFileTypeIcon("image")).toBe("🖼️");
      expect(getFileTypeIcon("unknown")).toBe("📄");
    });
  });

  describe("truncateText", () => {
    it("should truncate long text", () => {
      const longText = "This is a very long text that should be truncated";
      expect(truncateText(longText, 20)).toBe("This is a very long ...");
    });

    it("should not truncate short text", () => {
      const shortText = "Short text";
      expect(truncateText(shortText, 20)).toBe("Short text");
    });
  });
});
