import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { authenticate } from "./middleware/authenticate.js";
import { register } from "./controllers/register.js";
import { login } from "./controllers/login.js";
import { getUserDetails } from "./controllers/getUserDetails.js";
import { sendsConnection } from "./controllers/sendsConnection.js";
import { getIncomingConnections } from "./controllers/getIncomingConnections.js";
import { acceptConnection } from "./controllers/acceptConnection.js";
import { getConnections } from "./controllers/getConnections.js";
import { getUserData } from "./controllers/getUserData.js";
import { getSuggestions } from "./controllers/getSuggestions.js";
import { close } from "./controllers/close.js";

const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/register", register);
app.post("/login", login);
app.get("/getUserDetails", authenticate, getUserDetails);
app.post("/sendsConnection", authenticate, sendsConnection);
app.get("/getIncomingConnections", authenticate, getIncomingConnections);
app.post("/acceptConnection", authenticate, acceptConnection);
app.get("/getConnections", authenticate, getConnections);
app.post("/getUserData", authenticate, getUserData);
app.get("/getSuggestions", authenticate, getSuggestions);
app.get("/close", close);

app.listen(PORT, () => {
  console.log("app listening at port " + PORT);
});
