const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log("DB error", e);
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "PASTE_YOUR_TEST_USER_ID_HERE",
  };

  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
