import { createMocks } from "node-mocks-http";
import {
  methodIsPOST,
  methodNotAllowed,
  unauthorized,
  badRequest,
} from "../../api/helpers";
describe("Helper API functions", () => {
  test("Unauthorized should return 401", () => {
    const { req, res } = createMocks({});
    unauthorized(res);
    expect(res._getStatusCode()).toBe(401);
  });

  test("Bad request returns 422", () => {
    const { req, res } = createMocks({});
    badRequest(res);
    expect(res._getStatusCode()).toBe(422);
  });

  test("Method not allowed returns 405", () => {
    const { req, res } = createMocks({});
    methodNotAllowed(res);
    expect(res._getStatusCode()).toBe(405);
  });

  test("Method is post", () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    expect(methodIsPOST(req)).toBe(true);
    ["GET", "OPTIONS", "DELETE", "PUT", "PATCH"].forEach((method) => {
      req.method = method;
      expect(methodIsPOST(req)).toBe(false);
    });
  });
});
