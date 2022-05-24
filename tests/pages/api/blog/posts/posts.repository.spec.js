import PostsRepository from "../../../../api/blog/posts/posts.repository";
import mongoose from "mongoose";
const { mockPosts } = require("./posts.mock");

describe("Posts Repository", () => {
  describe("getPosts()", () => {
    let connection;
    let db;
    let repo;
    beforeAll(async () => {
      db = mongoose.createConnection(globalThis.__MONGO_URI__);
      const postCollection = db.collection("posts");
      postCollection.insertMany(mockPosts);
      repo = new PostsRepository(db);
    });

    afterAll(async () => {
      await db.close();
    });

    test("Repository.getPosts() returns an array of objects", async () => {
      const posts = await repo.getPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    test("getPosts() returns an array of objects with numeric id", async () => {
      const posts = await repo.getPosts();
      posts.forEach((post) => {
        expect(post).toHaveProperty("id");
        expect(isNaN(post.id)).toBe(false);
      });
    });

    test("getPosts() returns an array of objects with title string", async () => {
      const posts = await repo.getPosts();
      posts.forEach((post) => {
        expect(post).toHaveProperty("title");
        expect(typeof post.title).toBe("string");
      });
    });

    test("getPosts() returns an array of objects with content string", async () => {
      const posts = await repo.getPosts();
      console.log(posts);
      posts.forEach((p) => {
        const post = JSON.parse(JSON.stringify(p));
        expect(post).toHaveProperty("content");
        expect(typeof post.content).toBe("string");
      });
    });

    test("getPosts() returns an array of objects with array of string tags", async () => {
      const repo = new PostsRepository(db);
      const posts = await repo.getPosts();
      posts.forEach((p) => {
        const post = JSON.parse(JSON.stringify(p));
        expect(post).toHaveProperty("tags");
        expect(Array.isArray(post.tags)).toBe(true);
        post.tags.forEach((tag) => {
          expect(typeof tag).toBe("string");
        });
      });
    });
  });
});
