import { fetchWrapper } from "./fetch-wrapper";
import { userService } from "../features/Users/user.service";

jest.mock("../features/Users/user.service");

describe("fetchWrapper", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      headers: {},
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
      headers: { Authorization: "Bearer testToken" },
    });
    expect(result).toEqual(mockResponse);
  });
});
