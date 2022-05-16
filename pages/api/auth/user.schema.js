import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  mail: String,
  password: String,
  name: String,
  bio: String,
});

module.exports = { userSchema };
