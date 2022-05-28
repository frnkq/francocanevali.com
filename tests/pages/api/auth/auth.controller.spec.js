import { createMocks } from "node-mocks-http";
import { createConnection, closeConnection } from "../db";
import AuthController from "../../../../src/pages/api/auth/auth.controller";
import handleRegister from "../../../../src/pages/api/auth/register";
import AuthService from "../../../../src/pages/api/auth/auth.service";
import AuthRepository from "../../../../src/pages/api/auth/auth.repository";

jest.mock("../../../../src/pages/api/auth/auth.service");

describe("AuthController", () => {
  let mockLogin = jest.fn((email, password) => {});
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

      const controller = new AuthController();
      await controller.login(req, res);
      expect(res._getStatusCode()).toBe(405);
    });

    test("Returns unauthorized if a user object is not in the body", async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "POST",
        body: {
          not_email: "mail@mail.com",
          not_password: "password",
        },
      });
      await controller.login(req, res);
      expect(res._getStatusCode()).toBe(401);

      req.body = {
        email: "mail@mail.com",
        not_password: "password",
      };
      await controller.login(req, res);

      expect(res._getStatusCode()).toBe(401);

      req.body = {
        not_email: "mail@mail.com",
        password: "password",
      };
      await controller.login(req, res);
      expect(res._getStatusCode()).toBe(401);
    });

    test("Returns unauthorized if email field is not an email", async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail",
          password: "password",
        },
      });
      await controller.login(req, res);
      expect(res._getStatusCode()).toBe(401);
    });

    test("Returns unauthorized if email field is not an email", async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail",
          password: "password",
        },
      });
      await controller.login(req, res);
      expect(res._getStatusCode()).toBe(401);
    });

    test(`Calls AuthService.login() if all required keys are correct`, async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          password: "123456789",
        },
      });
      await controller.login(req, res);
      expect(AuthService).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith(req.body.email, req.body.password);
    });

    test("Returns unauthorized if user is not found in the repository", async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          password: "123456789",
        },
      });
      await controller.login(req, res);
      expect(AuthService).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith(req.body.email, req.body.password);
      expect(res._getStatusCode()).toBe(401);
    });

    test("Returns token in response body", async () => {
      const db = await createConnection();
      const controller = new AuthController();
      const authRepository = new AuthRepository(db);
      mockLogin = jest.fn(() => {
        return {
          email: "mail@mail.com",
          password: "password",
        };
      });

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
      await controller.login(req, res);
      expect(AuthService).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith(user.email, user.password);
      expect(res._getStatusCode()).toBe(200);
      await closeConnection();
    });
  });

  describe("Register", () => {
    test("Only allow POST method to register endpoint", async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "GET",
      });

      await controller.register(req, res);
      expect(res._getStatusCode()).toBe(405);

      req.method = "POST";
      await controller.register(req, res);
      expect(res._getStatusCode()).not.toBe(405);
    });

    test("Returns bad request if email, password and name are not provided", async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "POST",
        body: {},
      });
      await controller.register(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test("Returns bad request if email is not an email", async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail",
          password: "pass",
          name: "Some Name",
        },
      });
      await controller.register(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test(`Returns bad request if password is shorter than ${process.env.PASSWORD_MIN_LENGTH} characters long`, async () => {
      const controller = new AuthController();
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
      await controller.register(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test(`Returns bad request if password is longer than ${process.env.PASSWORD_MAX_LENGTH} characters long`, async () => {
      const controller = new AuthController();
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
      await controller.register(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test(`Returns bad request if name contains non alpha characters`, async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          name: '182u3iodjcp098duc0p+*=io"asñd9iu09c093u24*·',
          password: "12345678",
        },
      });
      await controller.register(req, res);
      expect(res._getStatusCode()).toBe(422);
    });

    test(`Calls AuthService.register() if all required keys are correct`, async () => {
      const controller = new AuthController();
      const { req, res } = createMocks({
        method: "POST",
        body: {
          email: "mail@mail.com",
          name: "Valid Name",
          password: "123456789",
        },
      });
      await controller.register(req, res);
      expect(AuthService).toHaveBeenCalled();
      expect(mockRegister).toHaveBeenCalledWith(
        req.body.email,
        req.body.password,
        req.body.name
      );
    });
  });
});
