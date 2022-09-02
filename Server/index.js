import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { authenticate } from "./middleware/authenticate.js";
import { register } from "./controllers/register.js";
import { login } from "./controllers/login.js";
import { getUserDetails } from "./controllers/getUserDetails.js";
import { getUserData } from "./controllers/getUserData.js";


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
app.post("/getUserData", authenticate, getUserData);

app.listen(PORT, () => {
  console.log("app listening at port " + PORT);
});
