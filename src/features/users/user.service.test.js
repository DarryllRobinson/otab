import { userService } from "./user.service";
import { fetchWrapper } from "../../_helpers/fetch-wrapper";

jest.mock("../../_helpers/fetch-wrapper");

describe("userService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login successfully and update userSubject", async () => {
    const mockUser = { id: 1, email: "test@example.com", jwtToken: "token" };
    fetchWrapper.post.mockResolvedValue(mockUser);

    const result = await userService.login({
      email: "test@example.com",
      password: "password",
    });

    expect(fetchWrapper.post).toHaveBeenCalledWith(
      `${userService.baseUrl}/authenticate`,
      { email: "test@example.com", password: "password" }
    );
    expect(result).toEqual(mockUser);
    expect(userService.userValue).toEqual(mockUser);
  });

  it("should handle login failure", async () => {
    fetchWrapper.post.mockRejectedValue(new Error("Invalid credentials"));

    await expect(
      userService.login({
        email: "test@example.com",
        password: "wrongpassword",
      })
    ).rejects.toThrow("Invalid credentials");
  });

  it("should logout and clear userSubject", () => {
    userService.logout();

    expect(userService.userValue).toBeNull();
  });

  it("should refresh token successfully", async () => {
    const mockUser = { id: 1, email: "test@example.com", jwtToken: "newToken" };
    fetchWrapper.post.mockResolvedValue(mockUser);

    const result = await userService.refreshToken();

    expect(fetchWrapper.post).toHaveBeenCalledWith(
      `${userService.baseUrl}/refresh-token`,
      {}
    );
    expect(result).toEqual(mockUser);
    expect(userService.userValue).toEqual(mockUser);
  });
});
