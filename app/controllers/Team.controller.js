const db = require("../models");
const Team = db.team;

// Create and Save a new Team
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Team
  const newTeam = new Team({
    name: req.body.name,
    image: req.body.image,
  });

  Team.create(newTeam, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Team.",
      });
    else res.send(data);
  });
};

// Add a member to a team
exports.addMember = (req, res) => {
  const { team_id, user_id, is_leader } = req.body;

  Team.addMember(team_id, user_id, is_leader, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while adding the member.",
      });
    else res.send(data);
  });
};

// Find the main team by user ID
exports.findMainTeamByUserId = (req, res) => {
  Team.findMainTeamByUserId(req.params.id_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found main team for user with id ${req.params.id_user}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving main team for user with id " + req.params.id_user,
        });
      }
    } else res.send(data);
  });
};

// Find all teams by user ID
exports.findAllTeamByUser = (req, res) => {
  Team.findAllTeamByUser(req.params.id_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found teams for user with id ${req.params.id_user}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving teams for user with id " + req.params.id_user,
        });
      }
    } else res.send(data);
  });
};

// Get all members of a team
exports.getAllMembers = (req, res) => {
  Team.getAllMembers(req.params.teamId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No members found for team with id ${req.params.teamId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving members for team with id " + req.params.teamId
        });
      }
    } else res.send(data);
  });
};

// Add a new member to a team by email
exports.addMemberByEmail = (req, res) => {
  // Validate request
  if (!req.body || !req.body.email || !req.params.teamId) {
    res.status(400).send({
      message: "Email and team ID are required!"
    });
    return;
  }

  Team.addMemberByEmail(req.params.teamId, req.body.email, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "An error occurred while adding the member to the team."
      });
    } else {
      res.status(201).send({
        message: "Member added successfully",
        data: data
      });
    }
  });
};

// Remove a member from a team
exports.removeMember = (req, res) => {
  Team.removeMember(req.params.teamId, req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Member with user ID ${req.params.userId} not found in team with ID ${req.params.teamId}.`
        });
      } else {
        res.status(500).send({
          message: "Error removing member from team"
        });
      }
    } else {
      res.send({ message: "Member was removed successfully from the team!" });
    }
  });
};