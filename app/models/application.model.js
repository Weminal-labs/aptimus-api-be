const sql = require("../config/db.js");

const Application = function (application) {
  this.id = application.id;
  this.name = application.name;
  this.image = application.image;
  this.team_id = application.team_id;
  this.public_key = application.public_key;
  this.private_key = application.private_key;
};

Application.create = (newApplication, result) => {
  sql.query("INSERT INTO applications SET ?", newApplication, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created application: ", {
      ...newApplication,
      id: res.insertId,
    });
    result(null, {
      ...newApplication,
      id: res.insertId,
    });
  });
};

Application.findById = (id, result) => {
  sql.query(`SELECT * FROM applications WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found application: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

Application.findAllByTeam = (id_team, result) => {
  sql.query(`SELECT * FROM applications WHERE team_id = ?`, [id_team], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found applications: ", res);
      result(null, res);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Application;
