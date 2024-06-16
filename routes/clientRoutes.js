const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

router.get('/clients', clientController.getClients);
router.get('/create/client', (req, res) => res.render('clients/create'));
router.post('/create/client', clientController.createClient);

module.exports = router;
