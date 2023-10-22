const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.getAdminDashboard);
router.get('/profile', adminController.getAdminProfile);
router.post('/profile', adminController.updateAdminProfile);

module.exports = router;
