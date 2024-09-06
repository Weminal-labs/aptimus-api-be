module.exports = (app) => {
  const applications = require("../controllers/Applications.controller.js");

  var router = require("express").Router();

  // Create a new Application
  router.post("/", applications.create);

  // Retrieve all Applications by team ID
  router.get("/team/:id_team", applications.findAllByTeam);

  // Retrieve a single Application by ID
  router.get("/:id", applications.findOne);

  // Update keys for an Application
  router.put("/:id/keys", applications.updateKeys);

  // Add this new route to create an auth provider for an application
  router.post("/:id/auth-providers", applications.addAuthProvider);

  // Add this new route to remove an auth provider
  router.delete("/:appId/auth-providers/:providerId", applications.removeAuthProvider);

  // Add this new route to get all auth providers for an application
  router.get("/:id/auth-providers", applications.getAllAuthProviders);

  // Update an Application
  router.put("/:id", applications.update);

  // New route for checking keys
  router.post("/check-keys", applications.checkKeys);

  app.use("/api/applications", router);
};