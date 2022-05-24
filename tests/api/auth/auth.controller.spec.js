import { createMocks } from "node-mocks-http";
import { createConnection, closeConnection } from "../db";
import handleLogin from "../../../src/api/auth/login/";
import handleRegister from "../../../src/api/auth/register/";
import AuthService from "../../../src/api/auth/auth.service";
import AuthRepository from "../../../src/api/auth/auth.repository";

jest.mock("../../../src/api/auth/auth.service");

describe("AuthController", () => {
  let mockLogin = jest.fn((email, password)=>{});
  let mockRegister = jest.fn((email, password, name) => {});
  beforeAll(() => {
    AuthService.mockImplementation(() => {
      return {
          login: mockLogin,
          register: mockRegister,
      };
    });
  });
  beforeEach(() => {
    AuthService.mockClear();
  });

  describe("Login", () => {
    test("Only allows POST login endpoint", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });

      await handleLogin(req, res);
      expect(res._getStatusCode()).toBe(405);

      req.method = "POST";
      await handleLogin(req, res);
      expect(res._getStatusCode()).not.toBe(405);
    });

    test("Returns unauthorized if a user object is not in the body", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          not_email: "mail@mail.com",
          not_password: "password",
        },
      });
      await handleLogin(req, res);
      expect(res._getStatusCode()).toBe(401);

      req.body = {
        email: "mail@mail.com",
        not_password: "password",
      };
      await handleLogin(req, res);

      expect(res._getStatusCode()).toBe(401);

      req.body = {
        not_email: "mail@mail.com",
        password: "password",
      };
      await handleLogin(req, res);
      expect(res._getStatusCode()).toBe(401);
    });

    test("Returns unauthorized if email field is not an email", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail",
          password: "password",
        },
      });
      await handleLogin(req, res);
      expect(res._getStatusCode()).toBe(401);
    });

    test("Returns unauthorized if email field is not an email", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail",
          password: "password",
        },
      });
      await handleLogin(req, res);
      expect(res._getStatusCode()).toBe(401);
    });

    test(`Calls AuthService.login() if all required keys are correct`, async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          password: "123456789",
        },
      });
      await handleLogin(req, res);
      expect(AuthService).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
    });

      test("Returns unauthorized if user is not found in the repository", async()=>{

      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          password: "123456789",
        },
      });
      await handleLogin(req, res);
      expect(AuthService).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(res._getStatusCode()).toBe(401);
    });

    test("Returns token in response body", async()=>{
        let authRepository;
        mockLogin = jest.fn(()=>{
            return {
                email: "mail@mail.com",
                password: "password"
            }
        })

      const db = await createConnection();
      authRepository = new AuthRepository(db);
      const { email, password, name, bio } = {
        email: "mail@mail.com",
        password: "password",
      };
      const user = await authRepository.createUser(email, password);
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: user.email,
          password: user.password,
        },
      });
      await handleLogin(req, res);
      expect(AuthService).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith(
        user.email,
        user.password
      );
      expect(res._getStatusCode()).toBe(200);
      await closeConnection();
    });
  });

  describe("Register", () => {
    test("Only allow POST method to register endpoint", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });

      await handleRegister(req, res);
      expect(res._getStatusCode()).toBe(405);

      req.method = "POST";
      await handleRegister(req, res);
      expect(res._getStatusCode()).not.toBe(405);
    });

    test("Returns bad request if email, password and name are not provided", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {},
      });
      await handleRegister(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test("Returns bad request if email is not an email", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail",
          password: "pass",
          name: "Some Name",
        },
      });
      await handleRegister(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test(`Returns bad request if password is shorter than ${process.env.PASSWORD_MIN_LENGTH} characters long`, async () => {
      const pass = Array(Number(process.env.PASSWORD_MIN_LENGTH) - 1)
        .fill("a")
        .join("");
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          password: pass,
          name: "Some Name",
        },
      });
      await handleRegister(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test(`Returns bad request if password is longer than ${process.env.PASSWORD_MAX_LENGTH} characters long`, async () => {
      const pass = Array(Number(process.env.PASSWORD_MAX_LENGTH) + 1)
        .fill("a")
        .join("");
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          password: pass,
          name: "Some Name",
        },
      });
      await handleRegister(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test(`Returns bad request if name contains non alpha characters`, async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          name: '182u3iodjcp098duc0p+*=io"asñd9iu09c093u24*·',
          password: "12345678",
        },
      });
      await handleRegister(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test(`Calls AuthService.register() if all required keys are correct`, async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          name: "Valid Name",
          password: "123456789",
        },
      });
      await handleRegister(req, res);
      expect(AuthService).toHaveBeenCalled();
      expect(mockRegister).toHaveBeenCalledWith(
        req.body.email,
        req.body.password,
        req.body.name
      );
    });
  });
});
