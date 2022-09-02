import { driver } from "../driver/neo4jdriver.js";

export const close = (req, res) => {
  driver.close();
};
