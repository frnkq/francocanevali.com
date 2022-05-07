import mongoose from "mongoose";
export default class PostsRepository {
  constructor() {}

  async getPosts() {
    //now instead of returning from here
    //return from a database
    //db factory?
    const posts = [
      { id: 1, title: "ASD", content: "ASD", tags: ["tag"] },
      { id: 3, title: "ASD", content: "LOL", tags: ["asd"] },
    ];
    try {
      await mongoose.connect("mongodb://blog:frnkquito@127.0.0.1:27017/blog");
      const { Schema } = mongoose;
      const postSchema = new Schema({
        title: String,
      });
      mongoose.models = {};
      const Post = mongoose.model("Post", postSchema);
      // const doc = new Post({ title: "asd" });
      //   await doc.save();
      const posts = Post.find({});
      return [];
    } catch (err) {
      console.error(err);
      return { err: err };
    }
  }
}
