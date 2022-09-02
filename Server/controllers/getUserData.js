import { driver } from "../driver/neo4jdriver.js";

export const getUserData = async (req, res) => {
  const session = driver.session();
  let readQuery =
    "MATCH (u:User{username: $usernameP})-[Connection]->(v:User{username: $currentUser}) RETURN u";
  let result = await session.readTransaction((tx) =>
    tx.run(readQuery, {
      usernameP: req.body.Username,
      currentUser: req.username,
    })
  );
  if (result.records.length > 0) {
    let data = result.records[0]._fields[0].properties;
    data["degree"] = 1;
    delete data.password;
    res.send(data);
  } else {
    readQuery =
      "MATCH (u:User{username: $usernameP})-[c1:Connection]->(w:User)-[c2:Connection]->(v:User{username: $currentUser}) RETURN u";
    result = await session.readTransaction((tx) =>
      tx.run(readQuery, {
        usernameP: req.body.Username,
        currentUser: req.username,
      })
    );
    if (result.records.length > 0) {
      let data = result.records[0]._fields[0].properties;
      data["degree"] = 2;
      delete data.password;
      res.send(data);
    } else {
      readQuery =
        "MATCH (u:User{username: $usernameP})-[c1:Connection]->(w:User)-[c2:Connection]->(x:User)-[c3:Connection]->(v:User{username: $currentUser}) RETURN u";
      result = await session.readTransaction((tx) =>
        tx.run(readQuery, {
          usernameP: req.body.Username,
          currentUser: req.username,
        })
      );
      if (result.records.length > 0) {
        let data = result.records[0]._fields[0].properties;
        data["degree"] = 3;
        delete data.password;
        res.send(data);
      } else {
        res.status(404);
        res.send({ message: "User Not found" });
      }
    }
  }
  session.close();
};
