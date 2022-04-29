export default class PostsService {
  constructor(repository) {
    this.repository = repository;
  }

  getPosts(size, page, reverseOrder = false) {
    const posts = this.repository.getPosts();
    return posts;
  }
}
