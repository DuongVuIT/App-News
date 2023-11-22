require("./db");
require("express-async-errors");
const express = require("express");
const cors = require("cors");

require("dotenv").config();
const morgan = require("morgan");
const postRouter = require("./routers/post");
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/post", postRouter);
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("port is listening on port " + PORT);
});
