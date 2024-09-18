require("dotenv").config();

module.exports = {
  host: process.env.HOST,
  user: "admin",
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
