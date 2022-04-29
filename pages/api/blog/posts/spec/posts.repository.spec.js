import PostsRepository from "../posts.repository";
jest.mock("../posts.repository");

beforeEach(() => {
  //PostsRepository.mockClear();
});

it("We can check if the consumer called the class constructor", () => {
  const repository = new PostsRepository();
  expect(PostsRepository).toHaveBeenCalledTimes(1);
});
