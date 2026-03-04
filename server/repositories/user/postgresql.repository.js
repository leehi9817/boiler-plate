const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db/postgresql/connection");

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  const query = `
    INSERT INTO users (name, email, password, lastname, role, image)
    VALUES ($1, $2, $3, $4, 0, NULL)
    RETURNING _id
  `;
  const values = [user.name, user.email, hashedPassword, user.lastname];

  const { rows } = await db.query(query, values);
  return rows[0];
};

const findByEmail = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;
  const { rows } = await db.query(query, [email]);
  return rows[0];
};

const generateToken = async (userId) => {
  const token = jwt.sign(userId.toString(), process.env.JWT_SECRET);

  const query = `
    UPDATE users
    SET token = $1
    WHERE _id = $2
    RETURNING _id, token
  `;
  const { rows } = await db.query(query, [token, userId]);
  return rows[0];
};

const findByToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const query = `
    SELECT *
    FROM users
    WHERE _id = $1 AND token = $2
  `;
  const { rows } = await db.query(query, [decoded, token]);
  return rows[0];
};

const clearToken = async (userId) => {
  const query = `
    UPDATE users
    SET token = NULL
    WHERE _id = $1
  `;
  await db.query(query, [userId]);
};

const isDuplicateEmailError = (err) => err && err.code === "23505";

module.exports = {
  createUser,
  findByEmail,
  generateToken,
  findByToken,
  clearToken,
  isDuplicateEmailError,
};
