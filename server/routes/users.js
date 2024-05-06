const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/users");
const auth = require("../utils/authMiddleware");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(auth, getUser).patch(auth, updateUser);

module.exports = router;
