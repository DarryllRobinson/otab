import { fetchWrapper } from "./fetch-wrapper";
import { userService } from "../features/Users/user.service";

jest.mock("../features/Users/user.service");

describe("fetchWrapper", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {}); // Mock console.error
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks(); // Restore console.error
  });

  it("should make a GET request and return data", async () => {
    const mockResponse = { data: "test" };
    global.fetch.mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(JSON.stringify(mockResponse)),
    });

    const result = await fetchWrapper.get("/test-url");

    expect(global.fetch).toHaveBeenCalledWith("/test-url", {
      method: "GET",
      credentials: "include", // Updated expectation
      headers: { "Content-Type": "application/json" }, // Updated expectation
    });
    expect(result).toEqual(mockResponse);
  });

  it("should handle a failed GET request", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
      text: jest
        .fn()
        .mockResolvedValue(JSON.stringify({ message: "Not Found" })),
    });

    await expect(fetchWrapper.get("/test-url")).rejects.toThrow("Not Found");
    expect(console.error).toHaveBeenCalledWith("API Error: 404"); // Assert console.error
  });

  it("should include Authorization header if user is logged in", async () => {
    userService.userValue = { jwtToken: "testToken" };
    const mockResponse = { data: "test" };
    global.fetch.mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(JSON.stringify(mockResponse)),
    });

    const result = await fetchWrapper.get("/test-url");

    expect(global.fetch).toHaveBeenCalledWith("/test-url", {
      method: "GET",
      credentials: "include", // Ensure credentials are included
      headers: {
        "Content-Type": "application/json", // Ensure Content-Type is included
        Authorization: "Bearer testToken", // Ensure Authorization header is explicitly included
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should log an error when processing the API response fails", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      text: jest.fn().mockRejectedValue(new Error("Processing Error")),
    });

    await expect(fetchWrapper.get("/test-url")).rejects.toThrow(
      "Processing Error"
    );
    expect(console.error).toHaveBeenCalledWith(
      "An error occurred while processing the API response."
    ); // Assert console.error
  });
});
