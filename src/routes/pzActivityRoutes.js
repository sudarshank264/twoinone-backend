const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
    getActivities,
    createActivity,
    deleteActivity
} = require('../controllers/pzActivityController');

router.route('/')
    .get(getActivities)
    .post(protect, upload.single('image'), createActivity);

router.route('/:id')
    .delete(protect, deleteActivity);

module.exports = router;
