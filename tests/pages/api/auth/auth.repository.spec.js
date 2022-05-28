import AuthRepository from "../../../../src/pages/api/auth/auth.repository";
import { createConnection, closeConnection } from "../db";
import { mockUser } from "./user.mock";
import {
  comparePassword,
  encryptPassword,
} from "../../../../src/helpers/encryptor";

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
      const encryptedPass = await encryptPassword(password);
      const user = await authRepository.createUser(
        email,
        encryptedPass,
        name,
        bio
      );
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("bio");
      expect(user).toHaveProperty("_id");
      expect(user.email).toBe(email);
      expect(user.name).toBe(name);
      expect(user.bio).toBe(bio);
      expect(user.password).toBe(encryptedPass);
    });
  });
});
