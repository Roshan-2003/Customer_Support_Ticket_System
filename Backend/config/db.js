require("dotenv").config();

const postgres = require("postgres").default;
const { drizzle } = require("drizzle-orm/postgres-js");

const connection = postgres(process.env.DATABASE_URL);

const db = drizzle(connection);

module.exports = db;
