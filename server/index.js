// dotenv 설정
const dotenv = require("dotenv");
dotenv.config();

// express 서버 생성
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT;

// Request Parsing 설정
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB 연결
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_DRIVER)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error(err));

// 라우팅 설정
app.use("/", require("./routes"));

// 서버 환경 설정값 출력
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", port);

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
