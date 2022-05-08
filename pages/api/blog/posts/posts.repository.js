import mongoose from "mongoose";
export default class PostsRepository {
  constructor(database = null) {
    if (database) {
      this.database = database;
    } else {
      this.database = mongoose.createConnection(
        "mongodb://blog:frnkquito@127.0.0.1:27017/blog"
      );
    }
  }

  async getPosts() {
    const posts = [
      { id: 1, title: "ASD", content: "ASD", tags: ["tag"] },
      { id: 3, title: "ASD", content: "LOL", tags: ["asd"] },
    ];
    try {
      const { Schema } = mongoose;
      const postSchema = new Schema({
        title: String,
      });
      const Post = this.database.model("Post", postSchema);
      this.database.models = {};
      const posts = await Post.find({});
      return posts;
    } catch (err) {
      return { err: err };
    }
  }
}
