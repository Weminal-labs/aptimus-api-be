module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // get user by email
  router.get("/get-by-email", users.findByEmail);

  app.use("/api/user", router);
};
