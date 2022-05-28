import mongoose from "mongoose";
import { encryptPassword, comparePassword } from "../../../helpers/encryptor";
const { userSchema } = require("./user.schema");
let User = null;
export default class AuthRepository {
  constructor(database = null) {
    this.database =
      database ||
      mongoose.createConnection(process.env.MONGODB_URI, {
        socketTimeoutMS: 10000,
      });
    User = this.database.model("User", userSchema);
  }

  async createUser(email, password, name = null, bio = null) {
    return new Promise(async (resolve, reject) => {
      if (!email || !password) {
        return reject("Email and password are required");
      }
      let user = new User({
        email,
        password,
        name,
        bio,
      });
      user = (await user.save())._doc;
      return resolve(user);
    });
  }

  async getUserByEmail(email) {
    return new Promise(async (resolve, reject) => {
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          reject(err);
        }
        resolve(user);
      });
    });
  }

  async getUserWithCredentials(email, password) {
    return new Promise(async (resolve, reject) => {
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return resolve(null);
        }
        const incorrectPass = await comparePassword(password, user.password);
        if (!user || !user.password || incorrectPass) {
          return resolve(null);
        }
        const passwordMatches = await comparePassword(password, user.password);
        if (!passwordMatches) {
          return resolve(null);
        }
        user.password = undefined;
        return resolve(user);
      });
    });
  }
}
