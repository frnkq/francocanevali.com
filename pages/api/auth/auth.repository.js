import mongoose from "mongoose";
const { userSchema } = require("./user.schema");
let User = null;
export default class AuthRepository {
  constructor(database = null) {
    this.database =
      database ||
      mongoose.createConnection(process.env.MONGODB_URI);
    User = this.database.model("User", userSchema);
  }

    async getUsers(){
        return [];
    }

  async getUser() {
    const users = await User.find({});
    return users;
  }
}
