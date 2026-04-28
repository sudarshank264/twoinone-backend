const PzAbout = require('../models/PzAbout');
const Joi = require('joi');

const aboutSchema = Joi.object({
    heroTitle: Joi.string().allow('', null),
    heroSubtitle: Joi.string().allow('', null),
    contactPhone: Joi.string().allow('', null),
    contactEmail: Joi.string().allow('', null),
    contactAddress: Joi.string().allow('', null),
    aboutTitle: Joi.string().allow('', null),
    aboutText: Joi.string().allow('', null),
    text: Joi.string().allow('', null),
    features: Joi.any()
}).unknown(true);

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

        const updateData = { ...req.body };
        
        if (req.body.features) {
            try {
                updateData.features = typeof req.body.features === 'string' ? JSON.parse(req.body.features) : req.body.features;
            } catch (e) {
                console.error("Failed to parse features", e);
            }
        }

        if (req.files) {
            if (req.files.heroImage && req.files.heroImage[0]) {
                updateData.heroImage = `/uploads/${req.files.heroImage[0].filename}`;
            }
            if (req.files.aboutImage && req.files.aboutImage[0]) {
                updateData.aboutImage = `/uploads/${req.files.aboutImage[0].filename}`;
            }
        }

        let about = await PzAbout.findOne();

        if (about) {
            // Update existing
            about = await PzAbout.findByIdAndUpdate(about._id, updateData, { new: true });
        } else {
            about = await PzAbout.create(updateData);
        }

        res.status(200).json(about);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error updating about' });
    }
};

module.exports = {
    getAbout,
    updateAbout
};
