import { createMocks } from "node-mocks-http";
import handleLogin from "../../../pages/api/auth/login/";
import handleRegister from "../../../pages/api/auth/register/";
import AuthService from "../../../pages/api/auth/auth.service";
jest.mock("../../../pages/api/auth/auth.service");

describe("AuthController", () => {
  const mockRegister = jest.fn((email, password, name) => {});
  beforeAll(() => {
    AuthService.mockImplementation(() => {
      return {
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
