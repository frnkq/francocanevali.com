var bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      resolve(hash);
    } catch (err) {
      reject(err.toString());
    }
  });
};

const comparePassword = async (password, hash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const matches = await bcrypt.compare(password, hash);
      resolve(matches);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  encryptPassword,
  comparePassword,
};
