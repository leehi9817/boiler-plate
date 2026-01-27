import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  //null    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(authUser()).then((response) => {
        if (!response.payload.isAuth) {
          // 로그인하지 않은 상태
          if (option) {
            navigate("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (!option) {
              navigate("/");
            }
          }
        }
      });
    }, [dispatch, navigate]);
    return <SpecificComponent />;
  }

  return <AuthenticationCheck />;
}
