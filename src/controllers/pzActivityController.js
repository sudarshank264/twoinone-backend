const PzActivity = require('../models/PzActivity');
const Joi = require('joi');

// Joi Validation Schema
const activitySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
});

// @desc    Get all activities
// @route   GET /api/playzone/activities
// @access  Public
const getActivities = async (req, res) => {
    try {
        const activities = await PzActivity.find().sort({ createdAt: -1 });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching activities' });
    }
};

// @desc    Create a new activity
// @route   POST /api/playzone/activities
// @access  Private/Admin
const createActivity = async (req, res) => {
    try {
        const { error } = activitySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const image = req.file ? `/uploads/${req.file.filename}` : null;
        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const activity = await PzActivity.create({
            title: req.body.title,
            description: req.body.description,
            image
        });

        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Server Error creating activity' });
    }
};

// @desc    Delete an activity
// @route   DELETE /api/playzone/activities/:id
// @access  Private/Admin
const deleteActivity = async (req, res) => {
    try {
        const activity = await PzActivity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        await activity.deleteOne();
        res.status(200).json({ message: 'Activity removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error deleting activity' });
    }
};

module.exports = {
    getActivities,
    createActivity,
    deleteActivity
};
