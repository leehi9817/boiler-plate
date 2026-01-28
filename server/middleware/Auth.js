const { User } = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.x_auth;

    // 비로그인 상태
    if (!token) {
      return res.status(200).json({
        isAuth: false,
      });
    }

    const user = await User.findByToken(token);

    // 인증 실패
    if (!user) {
      res.clearCookie("x_auth");
      return res.status(401).json({
        isAuth: false,
        error: {
          code: "INVALID_TOKEN",
          message: "유효하지 않은 토큰입니다.",
        },
      });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error("인증 오류:", err);
    return res.status(500).json({
      isAuth: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "서버 오류가 발생했습니다.",
      },
    });
  }
};

module.exports = { auth };
