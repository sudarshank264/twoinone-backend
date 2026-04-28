const express = require('express');
const router = express.Router();

const { getAbout, addOrUpdateAbout } = require('../controllers/aboutController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Reusable upload fields middleware
const uploadFields = upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'aboutImage', maxCount: 1 }
]);

// @route   GET, POST /api/about
// @desc    Get or update About section
router.route('/')
    .get(getAbout)
    .post(protect, uploadFields, addOrUpdateAbout);

module.exports = router;