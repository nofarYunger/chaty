import axios from "axios";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const URL = "https://chaty2021.herokuapp.com/auth";

const loginSignup = async (credentials, isSignup) => {
  try {

    const res = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, credentials);

    const { token, userId, hashedPassword, username, fullName } = res.data;
    console.log(res.status);

    console.log(res.data);
    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("phoneNumber", credentials.phoneNumber);
      cookies.set("avatarURL", credentials.avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }
    return Promise.resolve();
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  cookies.remove("token");
  cookies.remove("userId");
  cookies.remove("username");
  cookies.remove("fullName");
  cookies.remove("avatarURL");
  cookies.remove("hashedPassword");
  cookies.remove("phoneNumber");
};

export const authService = {
  loginSignup,
  logout,
};
