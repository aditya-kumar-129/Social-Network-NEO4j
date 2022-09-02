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

export const getConnections = async () => {
  const cookie = new Cookies();
  let response = await axios.get(`${URL}/getConnections`, {
    headers: {
      authorization: `Bearer ${cookie.get("token")}`,
    },
  });
  return response;
};

export const sendsConnection = async (input) => {
  const cookie = new Cookies();
  console.log(input);
  let response = await axios.post(
    `${URL}/sendsConnection`,
    {
      connectTo: input,
    },
    {
      headers: {
        authorization: `Bearer ${cookie.get("token")}`,
      },
    }
  );
  return response;
};

export const getUserData = async (username) => {
  const cookie = new Cookies();
  let response = await axios.post(
    `${URL}/getUserData`,
    {
      Username: username,
    },
    {
      headers: {
        authorization: `Bearer ${cookie.get("token")}`,
      },
    }
  );
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

export const getIncomingConnections = async () => {
  const cookie = new Cookies();
  let response = await axios.get(`${URL}/getIncomingConnections`, {
    headers: {
      authorization: `Bearer ${cookie.get("token")}`,
    },
  });
  return response;
};

export const acceptConnection = async (acceptConnectionFrom) => {
  const cookie = new Cookies();
  let response = await axios.post(
    `${URL}/acceptConnection`,
    {
      acceptConnectionFrom: acceptConnectionFrom,
    },
    {
      headers: {
        authorization: `Bearer ${cookie.get("token")}`,
      },
    }
  );
  return response;
};

export const getSuggestions = async () => {
  const cookie = new Cookies();
  let response = await axios.get(`${URL}/getSuggestions`, {
    headers: {
      authorization: `Bearer ${cookie.get("token")}`,
    },
  });
  return response;
};
