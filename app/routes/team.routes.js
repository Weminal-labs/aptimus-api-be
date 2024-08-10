module.exports = (app) => {
  const teams = require("../controllers/Team.controller.js");

  var router = require("express").Router();

  // Create a new Team
  router.post("/", teams.create);

  // Add a member to a team
  router.post("/add-member", teams.addMember);

  // Find the main team by user ID
  router.get("/main-team/:id_user", teams.findMainTeamByUserId);

  // Find all teams by user ID
  router.get("/all-teams/:id_user", teams.findAllTeamByUser);

  app.use("/api/team", router);
};