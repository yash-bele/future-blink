const jwt = require("jsonwebtoken");

const token = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

module.exports = token;
