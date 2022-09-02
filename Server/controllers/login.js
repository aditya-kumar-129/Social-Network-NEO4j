import { driver } from "../driver/neo4jdriver.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const session = driver.session();
  let { username, password } = req.body;

  let readQuery = "MATCH (u:User {username: $usernameP}) RETURN u";
  let result = await session.readTransaction((tx) =>
    tx.run(readQuery, {
      usernameP: username,
    })
  );

  if (result.records.length > 0) {
    let props = result.records[0]._fields[0].properties;
    bcrypt.compare(password, props.password, (err, result) => {
      if (result) {
        const TOKEN = jwt.sign(username, process.env.SECRET_KEY);
        res.json({ token: TOKEN });
      } else {
        res.status(401);
        res.send({ message: "Unauthorized access" });
      }
    });
  } else {
    res.status(404);
    res.send({ message: "Username not found do register" });
  }
  console.log("login success");
  session.close();
};
