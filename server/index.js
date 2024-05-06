const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const users = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // cors
app.use(express.json()); // middleware
app.use("/", users); // routes

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    app.listen(PORT, console.log(`Server listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
})();
