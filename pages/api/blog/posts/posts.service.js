export default class PostsService {
  constructor(repository) {
    this.repository = repository;
  }

  async getPosts(size, page, reverseOrder = false) {
    const posts = await  this.repository.getPosts();
    return posts;
  }
}
