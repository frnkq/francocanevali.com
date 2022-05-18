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
    try {
      const user = await this.repository.getUserWithCredentials(
        email,
        password
      );
      return this.createToken(user);
    } catch (err) {
      return null;
    }
  }

  async register(email, password, name) {}

  createToken(user) {
    const token = {
      bearer: "asd",
    };
    return token;
  }
}
