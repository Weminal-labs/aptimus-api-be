const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createConnection(dbConfig);

connection.connect((error) => { 
  if(error) {
    console.log("Error connecting to the database: " + error.code);
    return
  }

  console.log("Successfully connected to the database.");
});

module.exports = connection;