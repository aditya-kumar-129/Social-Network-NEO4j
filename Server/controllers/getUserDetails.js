import { driver } from "../driver/neo4jdriver.js";

export const getUserDetails = async (req, res) => {
  const session = driver.session();
  let readQuery = "MATCH (u:User {username: $usernameP}) RETURN u";
  let result = await session.readTransaction((tx) =>
    tx.run(readQuery, {
      usernameP: req.username,
    })
  );

  if (result.records.length > 0) {
    res.status(200);
    let data = result.records[0]._fields[0].properties;
    delete data.password;
    res.send(data);
  } else {
    console.log(err);
    res.send({ message: err });
  }
  console.log("/profile working");
  session.close();
};
