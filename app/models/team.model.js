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

Team.getAllMembers = (teamId, result) => {
  sql.query(
    `SELECT u.id, u.email, tu.is_leader 
     FROM users u 
     JOIN team_user tu ON u.id = tu.user_id 
     WHERE tu.team_id = ?`,
    [teamId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found team members: ", res);
        result(null, res);
        return;
      }

      // no members found
      result({ kind: "not_found" }, null);
    }
  );
};

Team.addMemberByEmail = (team_id, user_email, result) => {
  // First, check if the user exists
  sql.query(
    "SELECT id FROM users WHERE email = ?",
    [user_email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      let user_id;
      if (res.length === 0) {
        // User doesn't exist, create a new user
        sql.query(
          "INSERT INTO users SET ?",
          { email: user_email, wallet_address: "" },
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            user_id = res.insertId;
            addToTeam(team_id, user_id);
          }
        );
      } else {
        // User exists
        user_id = res[0].id;
        addToTeam(team_id, user_id);
      }
    }
  );

  function addToTeam(team_id, user_id) {
    sql.query(
      "INSERT INTO team_user SET ?",
      { team_id, user_id, is_leader: false },
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        result(null, {
          id: user_id,
          email: user_email,
          is_leader: 0,
        });
      }
    );
  }
};

Team.removeMember = (team_id, user_id, result) => {
  sql.query(
    "DELETE FROM team_user WHERE team_id = ? AND user_id = ?",
    [team_id, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Team Member with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(
        "deleted team member with team_id: ",
        team_id,
        " and user_id: ",
        user_id
      );
      result(null, res);
    }
  );
};

module.exports = Team;
