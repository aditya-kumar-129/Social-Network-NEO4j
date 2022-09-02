import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) res.send(err);
    req.username = user;
    next();
  });
};
