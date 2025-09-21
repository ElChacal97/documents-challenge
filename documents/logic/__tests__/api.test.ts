import { API_CONFIG } from "@/constants/api";
import { request } from "../api";

global.fetch = jest.fn();

describe("API request function", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should make a successful GET request", async () => {
    const mockData = { message: "success" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await request("/test-endpoint");

    expect(fetch).toHaveBeenCalledWith(`${API_CONFIG.BASE_URL}/test-endpoint`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual(mockData);
  });

  it("should make a POST request with body", async () => {
    const mockData = { id: 1, name: "test" };
    const requestBody = { name: "test" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await request("/test-endpoint", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledWith(`${API_CONFIG.BASE_URL}/test-endpoint`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual(mockData);
  });

  it("should handle custom headers", async () => {
    const mockData = { message: "success" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    await request("/test-endpoint", {
      headers: {
        Authorization: "Bearer token123",
        "Custom-Header": "custom-value",
      },
    });

    expect(fetch).toHaveBeenCalledWith(`${API_CONFIG.BASE_URL}/test-endpoint`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
        "Custom-Header": "custom-value",
      },
    });
  });

  it("should throw error for network failure", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(request("/test-endpoint")).rejects.toThrow("Network error");
  });

  it("should handle JSON parsing error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    });

    await expect(request("/test-endpoint")).rejects.toThrow("Invalid JSON");
  });

  it("should use correct base URL from config", async () => {
    const mockData = { message: "success" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    await request("/documents");

    expect(fetch).toHaveBeenCalledWith(
      `${API_CONFIG.BASE_URL}/documents`,
      expect.any(Object)
    );
  });
});
