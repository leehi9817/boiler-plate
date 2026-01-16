const ERROR_CODES = Object.freeze({
  // 인증 관련
  AUTH: {
    USER_NOT_FOUND: {
      code: "USER_NOT_FOUND",
      message: "제공된 이메일에 해당하는 유저가 없습니다.",
      status: 401,
    },
    INVALID_PASSWORD: {
      code: "INVALID_PASSWORD",
      message: "비밀번호가 틀렸습니다.",
      status: 401,
    },
    UNAUTHORIZED: {
      code: "UNAUTHORIZED",
      message: "인증이 필요합니다.",
      status: 401,
    },
  },

  // 서버 에러
  SERVER: {
    INTERNAL_ERROR: {
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다.",
      status: 500,
    },
  },

  // 검증 에러
  VALIDATION: {
    INVALID_INPUT: {
      code: "INVALID_INPUT",
      message: "입력값이 올바르지 않습니다.",
      status: 400,
    },
  },
});

module.exports = ERROR_CODES;
