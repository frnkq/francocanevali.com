import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
let mongo, db;
const createConnection = async () => {
  return new Promise(async (resolve, reject) => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    db = await mongoose.connect(uri);
    resolve(db);
  });
};

const closeConnection = async () => {
  return new Promise(async (resolve, reject) => {
    if (db && mongo) {
      db.connection.close();
      mongo.stop();
    }
    resolve(true);
  });
};
module.exports = {
  createConnection,
  closeConnection,
};
