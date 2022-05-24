import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  bio: String,
});

module.exports = { userSchema };
