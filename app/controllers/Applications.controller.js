const db = require("../models");
const Application = db.application;

// Create and Save a new Application
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create an Application
  const newApplication = new Application({
    name: req.body.name,
    image: req.body.image,
    team_id: req.body.team_id,
    public_key: req.body.public_key,
    private_key: req.body.private_key,
  });

  // Save Application in the database
  Application.create(newApplication, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Application.",
      });
    else res.send(data);
  });
};

// Retrieve all Applications by team ID
exports.findAllByTeam = (req, res) => {
  const id_team = req.params.id_team;

  Application.findAllByTeam(id_team, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Applications for team with id ${id_team}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Applications for team with id " + id_team,
        });
      }
    } else res.send(data);
  });
};

// Find a single Application by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Application.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Application with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Application with id " + id,
        });
      }
    } else res.send(data);
  });
};
