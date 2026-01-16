const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = process.env.SERVER_PORT;

// application/x-www-form-urlencoded
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_DRIVER)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/", require("./routes"));

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", port);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
