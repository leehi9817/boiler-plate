const router = require("express").Router();

const { User } = require("../models/User");
const { auth } = require("../middleware/Auth");

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const { sendError, sendSuccess } = require("../utils/responseHandler");
const ERROR_CODES = require("../constants/error");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/api/hello", (req, res) => {
  res.send("hello api 호출 성공");
});

// 회원 등록
router.post("/api/users/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    return sendSuccess(res, { message: "회원가입이 완료되었습니다." });
  } catch (err) {
    console.error("회원가입 오류:", err);

    // DB 중복 키 예외처리
    if (err.code === 11000) {
      return sendError(res, ERROR_CODES.VALIDATION.DUPLICATE_EMAIL);
    }

    return sendError(res, ERROR_CODES.SERVER.INTERNAL_ERROR);
  }
});

// 로그인
router.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // 이메일 오류 예외처리
    if (!user) {
      return sendError(res, ERROR_CODES.AUTH.USER_NOT_FOUND);
    }

    const isMatch = await user.comparePassword(req.body.password);

    // 비밀번호 오류 예외처리
    if (!isMatch) {
      return sendError(res, ERROR_CODES.AUTH.INVALID_PASSWORD);
    }

    const tokenUser = await user.generateToken();

    return res
      .cookie("x_auth", tokenUser.token)
      .status(200)
      .json({ success: true, data: { userId: tokenUser._id } });
  } catch (err) {
    console.error("로그인 오류:", err);
    return sendError(res, ERROR_CODES.SERVER.INTERNAL_ERROR);
  }
});

// 인증 관리
router.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.rold === 0 ? false : true,
    isAuth: true,
    email: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.iamge,
  });
});

// 로그아웃
router.get("/api/users/logout", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $unset: { token: 1 } },
    );
    return sendSuccess(res, { message: "로그아웃 되었습니다." });
  } catch (error) {
    return sendError(res, ERROR_CODES.SERVER.INTERNAL_ERROR);
  }
});

module.exports = router;
