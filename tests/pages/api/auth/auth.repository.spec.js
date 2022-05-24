import AuthRepository from "../../../../src/pages/api/auth/auth.repository";
import { comparePassword } from "../../../../src/helpers/encryptor";
import { createConnection, closeConnection } from "../db";
import { mockUser } from "./user.mock";

describe("Auth Repository", () => {
  let authRepository;
  beforeAll(async () => {
    const db = await createConnection();
    authRepository = new AuthRepository(db);
  });
  afterAll(async () => {
    await closeConnection();
  });

  describe("createUser()", () => {
    test("Create user throws error if email and password are not provided", async () => {
      return expect(authRepository.createUser()).rejects.toEqual(
        "Email and password are required"
      );
    });
    test("Create user throws error if email is not provided", async () => {
      return expect(
        authRepository.createUser(null, "password")
      ).rejects.toEqual("Email and password are required");
    });
    test("Create user throws error if password is not provided", async () => {
      return expect(
        authRepository.createUser("email@email.com", null)
      ).rejects.toEqual("Email and password are required");
    });

    test("Create user with required field inserts and returns user", async () => {
      const { email, password, name, bio } = {
        email: mockUser.email,
        password: mockUser.password,
        name: mockUser.name,
        bio: mockUser.bio,
      };
      const user = await authRepository.createUser(email, password, name, bio);
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("bio");
      expect(user).toHaveProperty("_id");
      expect(user.email).toBe(email);
      expect(user.name).toBe(name);
      expect(user.bio).toBe(bio);
    });

    test("Create a user encrypts password", async () => {
      const { email, password } = {
        email: "email@email.com",
        password: "password",
      };
      const user = await authRepository.createUser(email, password);
      const passwordMatches = await comparePassword(password, user.password);
      expect(user.password).not.toBe(password);
      expect(passwordMatches).toBe(true);
    });
  });

  describe("getUserWithCredentials()", () => {
    test("Get user with valid credentials returns user", async () => {
      const { email, password } = {
        email: mockUser.email,
        password: mockUser.password,
      };
      await authRepository.createUser(email, password);
      const user = await authRepository.getUserWithCredentials(email, password);
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
      return expect(
        authRepository.getUserWithCredentials("bad@email.com", password)
      ).rejects.toEqual("Invalid email/password");
    });

    test("Get user with invalid password throws Invalid email/password", async () => {
      const { email, password } = {
        email: mockUser.email,
        password: mockUser.password,
      };
      await authRepository.createUser(email, password);
      return expect(
        authRepository.getUserWithCredentials(email, "bad password")
      ).rejects.toEqual("Invalid email/password");
    });

    test("Get user with invalid email & password throws Invalid email/password", async () => {
      const { email, password } = {
        email: mockUser.email,
        password: mockUser.password,
      };
      await authRepository.createUser(email, password);
      return expect(
        authRepository.getUserWithCredentials("bad@email.com", "bad password")
      ).rejects.toEqual("Invalid email/password");
    });
  });
});
