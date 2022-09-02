import { driver } from "../driver/neo4jdriver.js";

export const sendsConnection = async (req, res) => {
  const session = driver.session();
  console.log(req.username);
  var writeQuery =
    "MATCH (a:User),(b:User) WHERE a.username = $usernameP AND b.username = $connectToP CREATE (a)-[r:SendsConnection]->(b) RETURN type(r)";
  var result = await session.writeTransaction((tx) =>
    tx.run(writeQuery, {
      usernameP: req.username,
      connectToP: req.body.connectTo,
    })
  );
  res.status(200);
  res.send({ message: "Success" });
  session.close();
};
