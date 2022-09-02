import { driver } from "../driver/neo4jdriver.js";

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export const getSuggestions = async (req, res) => {
  const session = driver.session();
  let readQuery =
    "MATCH (u:User{username: $usernameP })-[c1:Connection]->(v:User)-[c2:Connection]->(w: User) RETURN w;";
  let result = await session.readTransaction((tx) =>
    tx.run(readQuery, {
      usernameP: req.username,
    })
  );

  let suggestions = [];
  result.records.map((record) => {
    if (record._fields[0].properties.username != req.username)
      suggestions.push(record._fields[0].properties);
  });

  readQuery =
    "MATCH (u:User{username: $usernameP })-[c1:SendsConnection]->(v:User) RETURN v;";
  result = await session.readTransaction((tx) =>
    tx.run(readQuery, {
      usernameP: req.username,
    })
  );

  let alreadySentRequest = [];
  result.records.map((record) => {
    alreadySentRequest.push(record._fields[0].properties);
  });

  readQuery =
    "MATCH (u:User{username: $usernameP})-[c1:Connection]->(v:User) RETURN v";
  result = await session.readTransaction((tx) =>
    tx.run(readQuery, {
      usernameP: req.username,
    })
  );

  result.records.map((record) => {
    alreadySentRequest.push(record._fields[0].properties);
  });

  let sug = [];
  for (let j = 0; j < suggestions.length; ++j) {
    let bool = false;
    for (let i = 0; i < alreadySentRequest.length; ++i) {
      if (alreadySentRequest[i].username === suggestions[j].username) {
        bool = true;
      }
    }
    if (!bool) {
      sug.push(suggestions[j]);
    }
  }

  res.status(200);

  readQuery = "MATCH (u:User{username: $usernameP}) RETURN u;";
  result = await session.readTransaction((tx) =>
    tx.run(readQuery, {
      usernameP: req.username,
    })
  );

  sug.map((node) => {
    node.distance = distance(
      result.records[0]._fields[0].properties.latitude,
      result.records[0]._fields[0].properties.longitude,
      node.latitude,
      node.longitude
    );
  });

  sug.sort((a, b) => {
    return a.distance > b.distance ? 1 : a.distance === b.distance ? 0 : -1;
  });

  res.send(sug);
  session.close();
};
