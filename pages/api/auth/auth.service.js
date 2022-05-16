import AuthRepository from "./auth.repository";
export default class AuthService {
  constructor(repository = null) {
    if (repository) {
      this.repository = repository;
    } else {
      this.repository = new AuthRepository();
    }
  }

  async login(email, password) {
    const user = await this.repository.getUser(email, password);
    return user;
  }

  async register(email, password, name) {}
}
