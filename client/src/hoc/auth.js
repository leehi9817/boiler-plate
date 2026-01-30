import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/actions/userAction";
import { useNavigate } from "react-router-dom";

export default function Auth(SpecificComponent, authRoute, adminRoute = null) {
  // authRoute 옵션 설명
  // null   => 아무나
  // true   => 로그인 유저만
  // false  => 로그인 유저는 접근 불가

  // adminRoute 옵션 설명
  // null   => 아무나
  // true   => 관리자만

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuth, isAdmin, authCheck } = useSelector((state) => state.user);

    // 최초 진입 시 인증 상태 체크
    useEffect(() => {
      dispatch(authUser());
    }, [dispatch]);

    // 결과에 따라 라우팅 처리
    useEffect(() => {
      if (!authCheck) return;

      if (!isAuth) {
        // 로그인 X
        if (authRoute === true) {
          return navigate("/login");
        }
      } else {
        // 로그인 O
        if (adminRoute && !isAdmin) {
          return navigate("/");
        } else if (authRoute === false) {
          return navigate("/");
        }
      }
    }, [authCheck, isAuth, isAdmin, navigate]);

    return <SpecificComponent />;
  }

  return <AuthenticationCheck />;
}
