const express = require('express');
const router = express.Router();
const { loginAdmin, seedAdmin } = require('../controllers/authController');

router.post('/login', loginAdmin);
router.post('/seed', seedAdmin); // Hit this once to create an admin user

module.exports = router;
