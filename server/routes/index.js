const router = require("express").Router();
const cookieParser = require("cookie-parser");

const { auth } = require("../middleware/Auth");
const {
  createUser,
  findByEmail,
  generateToken,
  clearToken,
} = require("../models/User");

const { sendError, sendSuccess } = require("../utils/responseHandler");
const ERROR_CODES = require("../constants/error");

router.use(cookieParser());

// 회원 등록
router.post("/users/register", async (req, res) => {
  console.log("Register request body:", req.body);
  try {
    await createUser(req.body);
    return sendSuccess(res, { message: "회원가입이 완료되었습니다." });
  } catch (err) {
    console.error("회원가입 오류:", err);

    // DB 중복 키 예외처리
    if (err.code === "23505") {
      return sendError(res, ERROR_CODES.VALIDATION.DUPLICATE_EMAIL);
    }

    return sendError(res, ERROR_CODES.COMMON.DEFAULT);
  }
});

// 로그인
router.post("/users/login", async (req, res) => {
  try {
    const user = await findByEmail(req.body.email);

    // 이메일 오류 예외처리
    if (!user) {
      return sendError(res, ERROR_CODES.AUTH.USER_NOT_FOUND);
    }

    const isMatch = await require("bcrypt").compare(
      req.body.password,
      user.password,
    );

    // 비밀번호 오류 예외처리
    if (!isMatch) {
      return sendError(res, ERROR_CODES.AUTH.INVALID_PASSWORD);
    }

    const tokenUser = await generateToken(user._id);

    return res
      .cookie("x_auth", tokenUser.token)
      .status(200)
      .json({ success: true, data: { _id: tokenUser._id } });
  } catch (err) {
    console.error("로그인 오류:", err);
    return sendError(res, ERROR_CODES.COMMON.DEFAULT);
  }
});

// 인증관리
router.get("/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 1,
    isAuth: true,
    data: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      lastname: req.user.lastname,
      image: req.user.image,
    },
  });
});

// 로그아웃
router.get("/users/logout", auth, async (req, res) => {
  try {
    await clearToken(req.user._id);

    return res.clearCookie("x_auth").status(200).json({
      success: true,
      message: "로그아웃 되었습니다.",
    });
  } catch (err) {
    console.error("로그아웃 오류:", err);
    return sendError(res, ERROR_CODES.COMMON.DEFAULT);
  }
});

module.exports = router;
