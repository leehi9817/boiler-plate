const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 비밀번호 암호화
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, saltRounds);
});

// 비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// 토큰 생성
userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET, {
    algorithm: "HS256",
  });
  user.token = token;
  return user.save();
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
