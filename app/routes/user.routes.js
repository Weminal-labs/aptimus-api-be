module.exports = (app) => {
  const users = require("../controllers/User.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // get user by email
  router.get("/get-by-email", users.findByEmail);

  // New route for updating a user
  router.put("/:id", users.update);

  app.use("/api/user", router);
};
