import { PostsService } from "./posts.service";
import { PostsRepository } from "./posts.repository";

export default function handler(req, res) {
  const repository = new PostsRepository();
  const service = new PostsService(repository);
  const posts = service.getPosts(1, 1, false);
  res.status(200).json(posts);
}
