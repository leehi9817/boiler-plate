const dotenv = require("dotenv");
dotenv.config();

const dbType = (process.env.DB_TYPE || "mongodb").toLowerCase();
dotenv.config({ path: `.env.${dbType}` });

const express = require("express");
const bodyParser = require("body-parser");
const { initializeDatabase } = require("./config/database");

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

(async () => {
  try {
    const activeDb = await initializeDatabase();
    console.log(`Database connected: ${activeDb}`);
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
})();

app.use("/", require("./routes"));

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", port);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
