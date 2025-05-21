const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get("/", clientController.getClients);
router.get("/new", (req, res) => res.render("clients/new", {title: "New Client"}));
router.post("/", clientController.createClient);

module.exports = router;
