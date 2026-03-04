const DB_TYPES = {
  MONGODB: "mongodb",
  POSTGRESQL: "postgresql",
};

const detectDbType = () => {
  const explicitType = (process.env.DB_TYPE || "").toLowerCase();

  if (explicitType === DB_TYPES.MONGODB || explicitType === DB_TYPES.POSTGRESQL) {
    return explicitType;
  }

  return process.env.DB_DRIVER ? DB_TYPES.MONGODB : DB_TYPES.POSTGRESQL;
};

const dbType = detectDbType();

const initializeDatabase = async () => {
  if (dbType === DB_TYPES.MONGODB) {
    const mongodb = require("../db/mongodb/connection");
    await mongodb.connect();
    return dbType;
  }

  const postgresql = require("../db/postgresql/connection");
  await postgresql.connect();
  return dbType;
};

module.exports = {
  DB_TYPES,
  dbType,
  initializeDatabase,
};
