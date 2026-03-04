const { Pool } = require("pg");

let pool;

const getPool = () => {
  if (!pool) {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    pool.on("error", (err) => {
      console.error("Unexpected PG error", err);
      process.exit(1);
    });
  }

  return pool;
};

const connect = async () => {
  const activePool = getPool();
  await activePool.query("SELECT 1");
};

const query = (text, values) => getPool().query(text, values);

module.exports = {
  connect,
  query,
};
