import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../store/actions/userAction";

export default function Auth(SpecificComponent, authRoute, adminRoute = null) {
  // authRoute:
  // null  -> public
  // true  -> logged-in users only
  // false -> guests only
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, isAdmin, authCheck } = useSelector((state) => state.user);

    useEffect(() => {
      dispatch(authUser());
    }, [dispatch]);

    useEffect(() => {
      if (!authCheck) return;

      if (!isAuth && authRoute === true) {
        navigate("/login");
        return;
      }

      if (isAuth && adminRoute && !isAdmin) {
        navigate("/welcome");
        return;
      }

      if (isAuth && authRoute === false) {
        navigate("/welcome");
      }
    }, [authCheck, isAdmin, isAuth, navigate]);

    if (!authCheck) {
      return null;
    }

    return <SpecificComponent />;
  }

  return <AuthenticationCheck />;
}
