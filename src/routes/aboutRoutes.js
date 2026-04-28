const express = require('express');
const router = express.Router();
const { getAbout, addOrUpdateAbout } = require('../controllers/aboutController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const uploadFields = upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'aboutImage', maxCount: 1 }
]);

router.route('/')
    .get(getAbout)
    .post(protect, uploadFields, addOrUpdateAbout);

module.exports = router;
