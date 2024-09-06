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
    description: req.body.description,
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
    else res.status(201).send(data);
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

// Add this new method to update keys
exports.updateKeys = (req, res) => {
  // Validate request
  if (!req.body.public_key || !req.body.private_key) {
    res.status(400).send({
      message: "Public key and private key can not be empty!",
    });
    return;
  }

  const id = req.params.id;
  const newKeys = {
    public_key: req.body.public_key,
    private_key: req.body.private_key,
  };

  Application.updateKeys(id, newKeys, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Application with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating keys for Application with id " + id,
        });
      }
    } else res.send(data);
  });
};

// Add this new method to add an auth provider
exports.addAuthProvider = (req, res) => {
  // Validate request
  if (!req.body.type || !req.body.key) {
    res.status(400).send({
      message: "Auth provider type and key cannot be empty!",
    });
    return;
  }

  const authProvider = {
    type: req.body.type,
    key: req.body.key,
    application_id: req.params.id,
  };

  // Call the model method to add the auth provider
  Application.addAuthProvider(authProvider, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the auth provider.",
      });
    } else {
      res.send(data);
    }
  });
};

// Add this new method to remove an auth provider
exports.removeAuthProvider = (req, res) => {
  const appId = req.params.appId;
  const providerId = req.params.providerId;

  Application.removeAuthProvider(appId, providerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Auth provider not found with id ${providerId} for application ${appId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error removing auth provider " + providerId,
        });
      }
    } else res.send({ message: "Auth provider was deleted successfully!" });
  });
};

// Add this new method to get all auth providers for an application
exports.getAllAuthProviders = (req, res) => {
  const appId = req.params.id;

  Application.getAllAuthProviders(appId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send([]);
      } else {
        res.status(500).send({
          message:
            "Error retrieving auth providers for application with id " + appId,
        });
      }
    } else res.send(data);
  });
};

// Update an Application
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const id = req.params.id;
  const updatedApplication = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  };

  Application.update(id, updatedApplication, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Application with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Application with id " + id,
        });
      }
    } else res.send(data);
  });
};

exports.checkKeys = (req, res) => {
  const { publicKey, privateKey } = req.body;

  Application.checkKeys(publicKey, privateKey, (err, exists) => {
    if (err) {
      res.status(500).send({
        message: "Error checking keys.",
      });
    } else {
      res.send({ result: exists });
    }
  });
};
