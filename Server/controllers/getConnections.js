import { driver } from "../driver/neo4jdriver.js";

export const getConnections = async (req, res) => {
  const session = driver.session();
  let readQuery =
    "MATCH (u:User {username: $usernameP})-[c:Connection]->(n:User) RETURN n";
  let result = await session.readTransaction((tx) =>
    tx.run(readQuery, {
      usernameP: req.username,
    })
  );
  res.status(200);
  let usernames = [];
  result.records.map((record) => {
    usernames.push(record._fields[0].properties.username);
  });
  res.send(usernames);
  session.close();
};
