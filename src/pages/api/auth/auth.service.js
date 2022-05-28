import AuthRepository from "./auth.repository";
import { encryptPassword, comparePassword } from "../../../helpers/encryptor";
export default class AuthService {
  constructor(repository = null) {
    if (repository) {
      this.repository = repository;
    } else {
      this.repository = new AuthRepository();
    }
  }

  async login(email, password) {
    const user = await this.repository.getUserByEmail(email);
    const encryptedPass = await encryptPassword(password);
    const correctPassword = await comparePassword(password, encryptedPass);
    return correctPassword ? this.createToken(user) : null;
  }

  createToken(user) {
    if (!user) return null;
    const token = {
      bearer: "asd",
    };
    return token;
  }
}
