import AuthRepository from "../../../pages/api/auth/auth.repository";
import mongoose from "mongoose";

describe("Posts Repository", () => {
  describe("getPosts()", () => {
    let connection;
    let db;
    let repo;
    beforeAll(async () => {
      db = mongoose.createConnection(globalThis.__MONGO_URI__);
      const postCollection = db.collection("users");
      repo = new AuthRepository(db);
    });

    afterAll(async () => {
      await db.close();
    });

    test("Returns array", async () => {
      const posts = await repo.getUsers();
      expect(Array.isArray(posts)).toBe(true);
    });
  });
});
