const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/rn-blog")
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connected failed: ", err.message || err));
