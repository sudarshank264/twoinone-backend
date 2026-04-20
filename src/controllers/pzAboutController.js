const PzAbout = require('../models/PzAbout');
const Joi = require('joi');

const aboutSchema = Joi.object({
    text: Joi.string().required(),
    title: Joi.string().optional()
});

// @desc    Get about info
// @route   GET /api/playzone/about
// @access  Public
const getAbout = async (req, res) => {
    try {
        const about = await PzAbout.findOne();
        if (!about) {
            return res.status(200).json(null);
        }
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching about' });
    }
};

// @desc    Update about info (upsert)
// @route   PUT /api/playzone/about
// @access  Private/Admin
const updateAbout = async (req, res) => {
    try {
        const { error } = aboutSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updateData = {
            text: req.body.text,
            title: req.body.title || 'About House of Play'
        };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        let about = await PzAbout.findOne();

        if (about) {
            // Update existing
            about = await PzAbout.findByIdAndUpdate(about._id, updateData, { new: true });
        } else {
            // Check if image is present for first creation
            if (!req.file) {
                return res.status(400).json({ message: 'Image is required for initial creation' });
            }
            about = await PzAbout.create(updateData);
        }

        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: 'Server Error updating about' });
    }
};

module.exports = {
    getAbout,
    updateAbout
};
