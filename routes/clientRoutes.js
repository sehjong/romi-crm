const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get("/", clientController.getClients);
router.get("/new-client", (req, res) => res.render("clients/newClient", {title: "New Client"}));
router.post("/", clientController.createClient);

module.exports = router;
