const { DB_TYPES, dbType } = require("../../config/database");

const repositoryByType = {
  [DB_TYPES.MONGODB]: () => require("./mongodb.repository"),
  [DB_TYPES.POSTGRESQL]: () => require("./postgresql.repository"),
};

const loadRepository = () => {
  const factory = repositoryByType[dbType];

  if (!factory) {
    throw new Error(`Unsupported DB_TYPE: ${dbType}`);
  }

  return factory();
};

module.exports = loadRepository();
