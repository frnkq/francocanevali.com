import AuthRepository from "../../../pages/api/auth/auth.repository";
import { createConnection, closeConnection } from "../db";

describe("Posts Repository", () => {
  describe("getPosts()", () => {
    let repo;
    beforeAll(async () => {
      const db = await createConnection();
      repo = new AuthRepository(db);
    });
    afterAll(async () => {
      await closeConnection();
    });

    test("Returns array", async () => {
      const posts = await repo.getUser();
      expect(Array.isArray(posts)).toBe(true);
    });
  });
});
