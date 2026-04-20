const express = require('express');
const router = express.Router();
const { getAbout, addOrUpdateAbout } = require('../controllers/aboutController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getAbout)
    .post(protect, addOrUpdateAbout);

module.exports = router;
