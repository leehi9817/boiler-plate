const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const userSchema = new mongoose.Schema({
  name: { type: String, maxLength: 50 },
  email: { type: String, trim: true, unique: 1 },
  password: { type: String, minlength: 5 },
  lastname: { type: String, maxLength: 50 },
  role: { type: Number, default: 0, enum: [0, 1] },
  image: String,
  token: String,
  tokenExp: Number,
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  const created = await UserModel.create({
    ...user,
    password: hashedPassword,
  });

  return { _id: created._id };
};

const findByEmail = (email) => UserModel.findOne({ email });

const generateToken = async (userId) => {
  const token = jwt.sign(userId.toString(), process.env.JWT_SECRET);
  const updated = await UserModel.findByIdAndUpdate(
    userId,
    { token },
    { new: true },
  );

  if (!updated) {
    return null;
  }

  return { _id: updated._id, token: updated.token };
};

const findByToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return UserModel.findOne({ _id: decoded, token });
};

const clearToken = async (userId) => {
  await UserModel.findByIdAndUpdate(userId, { $unset: { token: 1 } });
};

const isDuplicateEmailError = (err) => err && err.code === 11000;

module.exports = {
  createUser,
  findByEmail,
  generateToken,
  findByToken,
  clearToken,
  isDuplicateEmailError,
};
