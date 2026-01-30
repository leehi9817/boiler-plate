import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/userAction";

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);

  const onClickLogin = () => navigate("/login");
  const onClickRegister = () => navigate("/register");

  const onClickLogout = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("로그아웃에 실패하였습니다.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>
      <div>
        {!isAuth && (
          <>
            <button onClick={onClickLogin}>Login</button>
            <button onClick={onClickRegister}>Register</button>
          </>
        )}

        {isAuth && (
          <>
            <button onClick={onClickLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
