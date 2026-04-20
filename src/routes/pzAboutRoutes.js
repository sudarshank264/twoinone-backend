const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
    getAbout,
    updateAbout
} = require('../controllers/pzAboutController');

router.route('/')
    .get(getAbout)
    .put(protect, upload.single('image'), updateAbout);

module.exports = router;
