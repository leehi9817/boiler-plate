const ERROR_CODES = require("../constants/error");

// ERROR_CODES 조회
const findErrorByStatus = (status) => {
  for (const group of Object.values(ERROR_CODES)) {
    for (const error of Object.values(group)) {
      if (error.status === status) {
        return error;
      }
    }
  }

  return ERROR_CODES.COMMON.DEFAULT;
};

const sendError = (res, error = {}) => {
  const status = error.status || ERROR_CODES.COMMON.DEFAULT.status;

  const errorInfo = findErrorByStatus(status);
  console.log(errorInfo);

  return res.status(errorInfo.status).json({
    success: false,
    error: {
      code: error.code || errorInfo.code,
      message: error.message || errorInfo.message,
    },
  });
};

const sendSuccess = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    data,
  });
};

module.exports = {
  sendError,
  sendSuccess,
};
