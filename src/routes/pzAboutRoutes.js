const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
    getAbout,
    updateAbout
} = require('../controllers/pzAboutController');

const uploadFields = upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'aboutImage', maxCount: 1 }
]);

router.route('/')
    .get(getAbout)
    .put(protect, uploadFields, updateAbout);

module.exports = router;
