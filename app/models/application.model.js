const sql = require("../config/db.js");

const Application = function (application) {
  this.name = application.name;
  this.image = application.image;
  this.description = application.description;
  this.team_id = application.team_id;
  this.public_key = application.public_key;
  this.private_key = application.private_key;
};

const AuthProvider = function (authProvider) {
  this.id = authProvider.id;
  this.type = authProvider.type;
  this.key = authProvider.key;
  this.application_id = authProvider.application_id;
};

Application.create = (newApplication, result) => {
  sql.query("INSERT INTO applications SET ?", newApplication, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created application: ", { id: res.insertId, ...newApplication });
    result(null, { id: res.insertId, ...newApplication });
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
  sql.query(
    `SELECT * FROM applications WHERE team_id = ?`,
    [id_team],
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

Application.updateKeys = (id, newKeys, result) => {
  sql.query(
    "UPDATE applications SET public_key = ?, private_key = ? WHERE id = ?",
    [newKeys.public_key, newKeys.private_key, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Application with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated application keys: ", { id: id, ...newKeys });
      result(null, { id: id, ...newKeys });
    }
  );
};

Application.addAuthProvider = (newAuthProvider, result) => {
  sql.query("INSERT INTO auth_providers SET ?", newAuthProvider, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created auth provider: ", { id: res.insertId, ...newAuthProvider });
    result(null, { id: res.insertId, ...newAuthProvider });
  });
};

Application.removeAuthProvider = (appId, providerId, result) => {
  sql.query(
    "DELETE FROM auth_providers WHERE id = ? AND application_id = ?",
    [providerId, appId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Auth Provider with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted auth provider with id: ", providerId);
      result(null, res);
    }
  );
};

Application.getAllAuthProviders = (appId, result) => {
  sql.query(
    "SELECT * FROM auth_providers WHERE application_id = ?",
    appId,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found auth providers: ", res);
        result(null, res);
        return;
      }

      // not found Auth Providers with the application id
      result({ kind: "not_found" }, null);
    }
  );
};

Application.update = (id, updatedApplication, result) => {
  sql.query(
    "UPDATE applications SET name = ?, image = ?, description = ? WHERE id = ?",
    [updatedApplication.name, updatedApplication.image, updatedApplication.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Application with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated application: ", { id: id, ...updatedApplication });
      result(null, { id: id, ...updatedApplication });
    }
  );
};

Application.checkKeys = (publicKey, privateKey, result) => {
  sql.query(
    "SELECT * FROM applications WHERE public_key = ? AND private_key = ?",
    [publicKey, privateKey],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res.length > 0);
    }
  );
};

module.exports = Application;