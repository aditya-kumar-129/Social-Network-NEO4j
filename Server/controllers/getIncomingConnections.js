import { driver } from "../driver/neo4jdriver.js";

export const getIncomingConnections = async (req, res) => {
  const session = driver.session();
  let readQuery =
    "MATCH (u:User{username:$usernameP})<-[s:SendsConnection]-(v:User) RETURN v;";
  let result = await session.readTransaction((tx) =>
    tx.run(readQuery, {
      usernameP: req.username,
    })
  );

  let incomingConnections = [];
  result.records.map((record) => {
    incomingConnections.push(record._fields[0].properties);
  });
  res.status(200).send(incomingConnections);
  session.close();
};
