const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createJWT = function (id) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const comparePassword = async function (candidatePassword, hashedPassword) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

const hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = { createJWT, comparePassword, hashPassword };
