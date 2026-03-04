import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/actions/userAction";
import "../Login/AuthPages.css";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  const passwordTooShort = password.length > 0 && password.length < 8;

  const isDisabled = useMemo(
    () =>
      isSubmitting ||
      !email.trim() ||
      !name.trim() ||
      !password ||
      !confirmPassword ||
      passwordMismatch ||
      passwordTooShort,
    [
      confirmPassword,
      email,
      isSubmitting,
      name,
      password,
      passwordMismatch,
      passwordTooShort,
    ],
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (password.length < 8) {
      setErrorMessage("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    if (passwordMismatch) {
      setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    const dataToSubmit = {
      email: email.trim(),
      name: name.trim(),
      password,
    };

    dispatch(registerUser(dataToSubmit))
      .then((response) => {
        if (response.payload.success) {
          navigate("/login");
          return;
        }

        setErrorMessage(
          response.payload?.error?.message ||
            "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.",
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <main className="auth-layout">
      <section className="auth-card" aria-label="Signup form">
        <div className="auth-header">
          <p className="auth-badge">SaaS Boilerplate</p>
          <h1>회원가입</h1>
          <p className="auth-subtitle">간단한 정보로 계정을 생성하세요.</p>
        </div>

        {(errorMessage || passwordMismatch) && (
          <p className="auth-alert" role="alert">
            {errorMessage ||
              "비밀번호와 비밀번호 확인이 일치하지 않습니다."}
          </p>
        )}

        <form className="auth-form" onSubmit={onSubmitHandler}>
          <div className="form-field">
            <label htmlFor="register-name">이름 또는 닉네임</label>
            <input
              id="register-name"
              type="text"
              placeholder="예: Kelly"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="register-email">이메일</label>
            <input
              id="register-email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="register-password">비밀번호</label>
            <input
              id="register-password"
              type="password"
              placeholder="8자 이상 입력"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <small className="helper-text">
              비밀번호는 영문/숫자 조합 기준 8자 이상을 권장합니다.
            </small>
          </div>

          <div className="form-field">
            <label htmlFor="register-confirm-password">비밀번호 확인</label>
            <input
              id="register-confirm-password"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={isDisabled}>
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <p className="auth-footer-text">
          이미 계정이 있나요? <Link to="/login">로그인</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
