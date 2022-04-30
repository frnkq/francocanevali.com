export default class PostsRepository {
  constructor() {}

  getPosts() {
    //now instead of returning from here
    //return from a database
    //db factory?
    const posts = [
      { id: 1, title: "ASD", content: "ASD", tags: ["tag"] },
      { id: 3, title: "ASD", content: "LOL", tags: ["asd"] },
    ];
    return posts;
  }
}
