const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    nodes: [{ type: Object }],
    edges: [{ type: Object }],
  },
  { timeStamp: true }
);

module.exports = mongoose.model("User", User);
