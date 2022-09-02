import { driver } from "../driver/neo4jdriver.js";
import bcrypt from "bcryptjs";
import axios from "axios";
const saltRounds = 10;

export const register = async (req, res) => {
  const session = driver.session();
  let { email, password, username, about } = req.body;
  let hash = await bcrypt.hash(password, saltRounds);
  if (!hash) console.log(hashError);
  password = hash;

  var readQuery = "MATCH (u:User {username: $usernameP}) RETURN u";
  var result = await session.readTransaction((tx) =>
    tx.run(readQuery, { usernameP: username })
  );

  if (result.records.length > 0)
    return res.status(409).send({ meassage: "Username already exists" });
  else {
    const params = {
      access_key: process.env.POSITIONSTACK_API_KEY,
      query: req.body.location,
    };
    let latitude, longitude;
    let response = await axios.get("http://api.positionstack.com/v1/forward", {
      params,
    });

    latitude = response.data.data[0].latitude;
    longitude = response.data.data[0].longitude;

    var writeQuery =
      "CREATE (:User {username: $usernameP, email: $emailP, password: $passwordP, about: $aboutP, longitude: $longitudeP, latitude: $latitudeP})";
    result = await session.writeTransaction((tx) => {
      tx.run(writeQuery, {
        usernameP: username,
        emailP: email,
        passwordP: password,
        aboutP: about,
        latitudeP: latitude,
        longitudeP: longitude,
      });
    });
    console.log("registration succesfull");
    res.status(200).send({ message: "Successfully Registered" });
  }
  session.close();
};
