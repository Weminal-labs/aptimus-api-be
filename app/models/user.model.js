const sql = require("../config/db.js");

const User = function (user) {
  this.id = user.id;
  this.email = user.email;
  this.wallet_address = user.wallet_address;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, {
      id: res.insertId,
      email: newUser.email,
      wallet_address: newUser.wallet_address,
    });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = ?`, [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.updateWalletAddress = (id, walletAddress, result) => {
  sql.query(
    "UPDATE users SET wallet_address = ? WHERE id = ?",
    [walletAddress, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user wallet address: ", { id: id, wallet_address: walletAddress });
      result(null, { id: id, wallet_address: walletAddress });
    }
  );
};

module.exports = User;
