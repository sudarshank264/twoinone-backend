const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/pzAboutController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Reusable upload fields middleware (clean approach)
const uploadFields = upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'aboutImage', maxCount: 1 }
]);

// @route   GET, PUT /api/playzone/about
// @desc    Get and update playzone about section
router.route('/')
    .get(getAbout)
    .put(protect, uploadFields, updateAbout);

module.exports = router;