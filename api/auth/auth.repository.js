import mongoose from "mongoose";
import { encryptPassword, comparePassword } from "../encryptor";
const { userSchema } = require("./user.schema");
let User = null;
export default class AuthRepository {
  constructor(database = null) {
    this.database =
      database || mongoose.createConnection(process.env.MONGODB_URI);
    User = this.database.model("User", userSchema);
  }

  async createUser(email, password, name = null, bio = null) {
    return new Promise(async (resolve, reject) => {
      if (!email || !password) {
        reject("Email and password are required");
        return;
      }
      const hashedPassword = await encryptPassword(password);
      let user = new User({
        email: email,
        password: hashedPassword,
        name: name,
        bio: bio,
      });
      user = (await user.save())._doc;
      resolve(user);
      return;
    });
  }

  async getUserWithCredentials(email, password) {
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return reject("Invalid email/password");
      }
      const passwordMatches = await comparePassword(password, user.password);
      if (!passwordMatches) {
        return reject("Invalid email/password");
      }
      user.password = undefined;
      return resolve(user);
    });
  }
}
