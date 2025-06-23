const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

// Shows all clients
router.get("/", clientController.getClients);

// Shows the form to create a new client
router.get("/new-client", (req, res) => res.render("clients/newClient", {title: "New Client"}));

// Creates a new client
router.post("/", clientController.createClient);

// Shows one client
router.get("/:id", clientController.showClient);

// Edits a client
router.get("/:id/edit", clientController.editClient);

// Updates a client
router.put("/:id", clientController.updateClient);

// Deletes a client
router.delete("/:id", clientController.deleteClient);

module.exports = router;
