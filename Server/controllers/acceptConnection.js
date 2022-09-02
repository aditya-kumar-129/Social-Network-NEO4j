import { driver } from "../driver/neo4jdriver.js";

export const acceptConnection = async (req, res) => {
  const session = driver.session();
  let { acceptConnectionFrom } = req.body;
  let writeQuery = `MATCH (a:User)<-[s:SendsConnection]-(b:User) 
    WHERE a.username = $usernameP AND b.username= $acceptConnectionFromP 
    CREATE (a)-[c:Connection]->(b) CREATE (a)<-[r:Connection]-(b) RETURN c, r`;
  let result = await session.writeTransaction((tx) =>
    tx.run(writeQuery, {
      usernameP: req.username,
      acceptConnectionFromP: acceptConnectionFrom,
    })
  );
  res.status(200);
  res.send({ message: "Success" });
  writeQuery =
    "MATCH (a:User)<-[s:SendsConnection]-(b:User) WHERE a.username = $usernameP AND b.username= $acceptConnectionFromP DELETE s";
  result = await session.writeTransaction((tx) =>
    tx.run(writeQuery, {
      usernameP: req.username,
      acceptConnectionFromP: acceptConnectionFrom,
    })
  );
  session.close();
};
