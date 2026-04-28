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

// @route   GET /api/activities
// @desc    Get all activities
router.route('/')
    .get(getActivities)
    .post(protect, upload.single('image'), createActivity);

// @route   GET, PUT, DELETE /api/activities/:id
// @desc    Get single, update, delete activity
router.route('/:id')
    .get(getActivityById) // keep this (from HEAD)
    .put(protect, upload.single('image'), updateActivity)
    .delete(protect, deleteActivity);

module.exports = router;