import AuthService from "../../../../src/pages/api/auth/auth.service";
import { mockUser } from "./user.mock";

describe("Auth Service", () => {
  describe("login()", () => {
    test("Returns null for non-existing user", async () => {
      const getUserWithCredentialsMock = jest.fn(async () => {
        return new Promise((resolve, reject) => {
          return reject("Invalid email/password");
        });
      });

      const AuthRepository = {
        getUserWithCredentials: getUserWithCredentialsMock,
      };

      const service = new AuthService(AuthRepository);
      return expect(service.login("username", "password")).rejects.toMatch(
        "Invalid email/password"
      );
    });

    test("Returns token for existing user", async () => {
      const getUserWithCredentialsMock = jest.fn(async () => {
        return new Promise((resolve, reject) => {
          resolve(mockUser);
        });
      });
      const AuthRepository = {
        getUserWithCredentials: getUserWithCredentialsMock,
      };

      const service = new AuthService(AuthRepository);
      const token = await service.login(mockUser.email, mockUser.password);
      expect(token).toHaveProperty("bearer");
    });
  });
});
