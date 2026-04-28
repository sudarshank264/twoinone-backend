const PzActivity = require('../models/PzActivity');
const Joi = require('joi');

// Joi Validation Schema
const activitySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
});

// Get all
const getActivities = async (req, res) => {
    try {
        const activities = await PzActivity.find().sort({ createdAt: -1 });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching activities' });
    }
};

// Get by ID
const getActivityById = async (req, res) => {
    try {
        const activity = await PzActivity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching activity' });
    }
};

// Create
const createActivity = async (req, res) => {
    try {
        const { error } = activitySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const activity = await PzActivity.create({
            title: req.body.title,
            description: req.body.description,
            image: `/uploads/${req.file.filename}`
        });

        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Server Error creating activity' });
    }
};

// ✅ SINGLE updateActivity (merged version)
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

        // Update fields
        activity.title = req.body.title || activity.title;
        activity.description = req.body.description || activity.description;

        // Update image
        if (req.file) {
            activity.image = `/uploads/${req.file.filename}`;
        }

        await activity.save();
        res.status(200).json(activity);

    } catch (error) {
        res.status(500).json({ message: 'Server Error updating activity' });
    }
};

// Delete
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
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
};