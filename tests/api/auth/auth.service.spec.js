import AuthService from "../../../pages/api/auth/auth.service";

describe("Auth Service", () => {
  test("Returns token object for an existing user", async () => {
    const getUserMock = jest.fn(() => {
      return { _id: 1, email: "mail@mail.com" };
    });

    const AuthRepository = {
      getUser: getUserMock,
    };

    const service = new AuthService(AuthRepository);
    const token = await service.login("username", "password");
    expect(token).toHaveProperty("bearer");
    expect(token).toHaveProperty("expires_in");
    expect(isNaN(token.expires_in)).toBe(false);
  });

  test("Returns null for non-existing user", async () => {
    const getUserMock = jest.fn(() => {
      return null;
    });

    const AuthRepository = {
      getUser: getUserMock,
    };

    const service = new AuthService(AuthRepository);
    const token = await service.login("username", "password");
    expect(token).toBe(null);
  });
});
