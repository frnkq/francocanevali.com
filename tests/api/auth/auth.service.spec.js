import AuthService from "../../../api/auth/auth.service";
import { mockUser } from "./user.mock";

describe("Auth Service", () => {
  describe("login()", () => {
    test("Returns null for non-existing user", async () => {
      const getUserWithCredentialsMock = jest.fn(async () => {
        return new Promise((resolve, reject) => {
          reject("Invalid email/password");
        });
      });

      const AuthRepository = {
        getUserWithCredentials: getUserWithCredentialsMock,
      };

      const service = new AuthService(AuthRepository);
      const token = await service.login("username", "password");
      expect(token).toBe(null);
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
