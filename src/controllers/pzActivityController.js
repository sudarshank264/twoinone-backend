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

// @desc    Get single activity by ID
// @route   GET /api/playzone/activities/:id
// @access  Public
const getActivityById = async (req, res) => {
    try {
        const activity = await PzActivity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(500).json({ message: 'Server Error fetching activity' });
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
const updateActivity = async (req, res) => {
    try {
        const { error } = activitySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const activity = await PzActivity.findById(req.params.id);  
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        if (req.file) {
            activity.image = `/uploads/${req.file.filename}`;
        }
        activity.title = req.body.title || activity.title;
        activity.description = req.body.description || activity.description;
        await activity.save();
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Server Error updating activity' });
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

// @desc    Update an activity
// @route   PUT /api/playzone/activities/:id
// @access  Private/Admin
const updateActivity = async (req, res) => {
    try {
        const activity = await PzActivity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        const { title, description } = req.body;
        if (title) activity.title = title;
        if (description) activity.description = description;

        if (req.file) {
            activity.image = `/uploads/${req.file.filename}`;
        }

        await activity.save();
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Server Error updating activity' });
    }
};

module.exports = {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
};
