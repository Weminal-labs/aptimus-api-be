const db = {};

db.application = require("./application.model.js");
db.team = require("./team.model.js");
db.user = require("./user.model.js");

module.exports = db;
