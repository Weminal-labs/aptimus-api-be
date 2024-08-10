const sql = require("../config/db.js");

const Team = function (team) {
  this.id = team.id;
  this.name = team.name;
  this.image = team.image;
};

Team.create = (newTeam, result) => {
  sql.query("INSERT INTO teams SET ?", newTeam, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created team: ", {
      id: res.insertId,
      ...newTeam,
    });
    result(null, {
      ...newTeam,
      id: res.insertId,
    });
  });
};

Team.addMember = (team_id, user_id, is_leader, result) => {
  sql.query(
    "INSERT INTO team_user SET ?",
    { team_id, user_id, is_leader },
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, {
        team_id: team_id,
        user_id: user_id,
        is_leader: is_leader,
      });
    }
  );
};

Team.findMainTeamByUserId = (id_user, result) => {
  sql.query(
    `SELECT * FROM teams WHERE id in (SELECT team_id FROM team_user where user_id = ? and is_leader = ?)`,
    [id_user, true],
    (err, res) => {
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
    }
  );
};

Team.findAllTeamByUser = (id_user, result) => {
  sql.query(
    `SELECT * FROM teams WHERE id in (SELECT team_id FROM team_user where user_id = ?)`,
    [id_user],
    (err, res) => {
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
    }
  );
};

module.exports = Team;
