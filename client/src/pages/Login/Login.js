import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/userAction";
import "./AuthPages.css";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled = useMemo(
    () => isSubmitting || !email.trim() || !password.trim(),
    [email, isSubmitting, password],
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const dataToSubmit = {
      email: email.trim(),
      password,
    };

    dispatch(loginUser(dataToSubmit))
      .then((response) => {
        if (response.payload.success) {
          navigate("/welcome");
          return;
        }

        setErrorMessage(
          response.payload?.error?.message ||
            "로그인에 실패했습니다. 입력 정보를 다시 확인해주세요.",
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <main className="auth-layout">
      <section className="auth-card" aria-label="Login form">
        <div className="auth-header">
          <p className="auth-badge">SaaS Boilerplate</p>
          <h1>로그인</h1>
          <p className="auth-subtitle">
            계정에 로그인하고 대시보드로 바로 이동하세요.
          </p>
        </div>

        {errorMessage && (
          <p className="auth-alert" role="alert">
            {errorMessage}
          </p>
        )}

        <form className="auth-form" onSubmit={onSubmitHandler}>
          <div className="form-field">
            <label htmlFor="login-email">이메일</label>
            <input
              id="login-email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>

          <div className="form-field">
            <div className="field-row">
              <label htmlFor="login-password">비밀번호</label>
              <button
                type="button"
                className="text-button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "숨기기" : "보기"}
              </button>
            </div>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>

          <label className="checkbox-row">
            <input type="checkbox" />
            <span>로그인 유지</span>
          </label>

          <button className="btn btn-primary" type="submit" disabled={isDisabled}>
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="auth-footer-text">
          계정이 없나요? <Link to="/register">회원가입</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
