import Cookies from "universal-cookie";
const axios = require("axios").default;
const URL = "http://localhost:5000";

export const registerUser = async (
  username,
  password,
  email,
  about,
  location
) => {
  let response = await axios.post(`${URL}/register`, {
    username,
    password,
    email,
    about,
    location,
  });
  return response.status;
};

export const loginUser = async (username, password) => {
  const cookie = new Cookies();
  let response = await axios.post(`${URL}/login`, {
    headers: {
      authorization: cookie.get("token"),
    },
    username,
    password,
  });
  return response;
};

export const getProfile = async () => {
  const cookie = new Cookies();
  let response = await axios.get(`${URL}/getUserDetails`, {
    headers: {
      authorization: `Bearer ${cookie.get("token")}`,
    },
  });
  return response;
};