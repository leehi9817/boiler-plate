import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";

export function loginUser(dataToSubmit) {
  const payload = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return {
    type: LOGIN_USER,
    payload: payload,
  };
}

export function registerUser(dataToSubmit) {
  const payload = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return {
    type: REGISTER_USER,
    payload: payload,
  };
}
