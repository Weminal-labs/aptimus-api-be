module.exports = (app) => {
  const applications = require("../controllers/Applications.controller.js");

  var router = require("express").Router();

  // Create a new Application
  router.post("/", applications.create);

  // Retrieve all Applications by team ID
  router.get("/team/:id_team", applications.findAllByTeam);

  // Retrieve a single Application by ID
  router.get("/:id", applications.findOne);

  app.use("/api/applications", router);
};
