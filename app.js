const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-err");
const mainRouter = require("./routes");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("DB error:", err);
  });

app.use(cors());
app.use(express.json());

app.use("/", mainRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
