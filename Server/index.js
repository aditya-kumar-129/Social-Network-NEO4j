import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { register } from "./controllers/register.js";
import { login } from "./controllers/login.js";

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

app.listen(PORT, () => {
  console.log("app listening at port " + PORT);
});
