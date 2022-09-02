import neo4j from "neo4j-driver";
import dotenv from "dotenv";
dotenv.config();

export const driver = neo4j.driver(
  process.env.URI,
  neo4j.auth.basic(process.env.DB_USER, process.env.PASSWORD)
);
