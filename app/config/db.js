const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  console.log(dbConfig);
  if (error) {
    console.log(
      "Error connecting to the database: " + error.code + error.message
    );
    return;
  }

  console.log("Successfully connected to the database.");
});

module.exports = connection;
