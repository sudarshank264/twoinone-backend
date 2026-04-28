const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
} = require('../controllers/pzActivityController');

router.route('/')
    .get(getActivities)
    .post(protect, upload.single('image'), createActivity);

router.route('/:id')
    .get(getActivityById)
    .put(protect, upload.single('image'), updateActivity)
    .delete(protect, deleteActivity);

module.exports = router;
