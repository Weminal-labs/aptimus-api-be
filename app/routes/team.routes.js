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

  // Get all members of a team
  router.get("/:teamId/members", teams.getAllMembers);

  // Add a new member to a team by email
  router.post("/:teamId/add-member", teams.addMemberByEmail);

  // Remove a member from a team
  router.delete("/:teamId/members/:userId", teams.removeMember);

  app.use("/api/team", router);
};
