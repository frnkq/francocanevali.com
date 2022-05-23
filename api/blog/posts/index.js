import PostsRepository from "./posts.repository";
import PostsService from "./posts.service";

export default async function handler(req, res) {
  const repository = new PostsRepository();
  const service = new PostsService(repository);
  const posts = await service.getPosts(1, 1, false);
  res.status(200).json(posts);
}
