import AuthService from "../../../../src/pages/api/auth/auth.service";
import AuthRepository from "../../../../src/pages/api/auth/auth.repository";
import { createConnection, closeConnection } from "../db";
import { mockUser } from "./user.mock";

describe("Auth Service", () => {
  let authRepository;
  beforeAll(async () => {
    const db = await createConnection();
    authRepository = new AuthRepository(db);
  });
  afterAll(async () => {
    await closeConnection();
  });
  describe("login()", () => {
    test("Returns null for non-existing user", async () => {
      const getUserByEmailMock = jest.fn(async () => {
        return new Promise((resolve, reject) => {
          return resolve(null);
        });
      });

      const AuthRepository = {
        getUserByEmail: getUserByEmailMock,
      };

      const service = new AuthService(AuthRepository);
      const user = await service.login("username", "password");
      expect(user).toBe(null);
    });

    test("Returns token for existing user", async () => {
      const getUserByEmailMock = jest.fn(async () => {
        return new Promise((resolve, reject) => {
          resolve(mockUser);
        });
      });
      const AuthRepository = {
        getUserByEmail: getUserByEmailMock,
      };

      const service = new AuthService(AuthRepository);
      const token = await service.login(mockUser.email, mockUser.password);
      expect(token).toHaveProperty("bearer");
    });
  });
  describe("getUserWithCredentials()", () => {
    test("Get user with valid credentials returns user", async () => {
      const { email, password } = {
        email: mockUser.email,
        password: mockUser.password,
      };
      await authRepository.createUser(email, password);
      const user = await authRepository.getUserByEmail(email);
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("_id");
      expect(user.email).toBe(email);
    });

    test("Get user with invalid email throws Invalid email/password", async () => {
      const { email, password } = {
        email: mockUser.email,
        password: mockUser.password,
      };
      await authRepository.createUser(email, password);
      const user = await authRepository.getUserByEmail(
        "bad@email.com",
        password
      );
      expect(user).toBe(null);
    });
  });
});
