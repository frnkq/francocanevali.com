import PostsRepository from "../posts.repository";

describe("Posts Repository", () => {
  describe("getPosts()", () => {
    test("Repository.getPosts() returns an array of objects", () => {
      const repo = new PostsRepository();
      const posts = repo.getPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    test("getPosts() returns an array of objects with numeric id", () => {
      const repo = new PostsRepository();
      const posts = repo.getPosts();
      posts.forEach((post) => {
        expect(post).toHaveProperty("id");
        expect(isNaN(post.id)).toBe(false);
      });
    });

    test("getPosts() returns an array of objects with title string", () => {
      const repo = new PostsRepository();
      const posts = repo.getPosts();
      posts.forEach((post) => {
        expect(post).toHaveProperty("title");
        expect(typeof post.title).toBe("string");
      });
    });

    test("getPosts() returns an array of objects with content string", () => {
      const repo = new PostsRepository();
      const posts = repo.getPosts();
      posts.forEach((post) => {
        expect(post).toHaveProperty("content");
        expect(typeof post.content).toBe("string");
      });
    });

    test("getPosts() returns an array of objects with array of string tags", () => {
      const repo = new PostsRepository();
      const posts = repo.getPosts();
      posts.forEach((post) => {
        expect(post).toHaveProperty("tags");
        expect(Array.isArray(post.tags)).toBe(true);
        post.tags.forEach((tag) => {
          expect(typeof tag).toBe("string");
        });
      });
    });
  });
});
