import AuthRepository from "../../../pages/api/auth/auth.repository";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Posts Repository", () => {
  describe("getPosts()", () => {
    let mongo, uri, db, repo;
    beforeAll(async () => {
      mongo = await MongoMemoryServer.create();
      const uri = mongo.getUri();
      db = await mongoose.connect(uri);
      repo = new AuthRepository(db);
    });

    afterAll(async () => {
      if (db) {
        db.connection.close();
      }
      if (mongo) {
        mongo.stop();
      }
    });

    test("Returns array", async () => {
      const posts = await repo.getUsers();
      expect(Array.isArray(posts)).toBe(true);
    });
  });
});
