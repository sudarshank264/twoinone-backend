const PzAbout = require('../models/PzAbout');
const Joi = require('joi');

// Validation schema
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
        return res.status(200).json(about || {});
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching about' });
    }
};

// @desc    Update about info (upsert)
// @route   PUT /api/playzone/about
// @access  Private/Admin
const updateAbout = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = aboutSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let data = { ...value };

        // Parse features if string
        if (data.features && typeof data.features === 'string') {
            try {
                data.features = JSON.parse(data.features);
            } catch (e) {
                console.error('Invalid features JSON');
            }
        }

        // Handle file uploads
        if (req.files) {
            if (req.files.heroImage) {
                data.heroImage = `/uploads/${req.files.heroImage[0].filename}`;
            }
            if (req.files.aboutImage) {
                data.aboutImage = `/uploads/${req.files.aboutImage[0].filename}`;
            }
        }

        let about = await PzAbout.findOne();

        if (about) {
            about.set(data);
            await about.save();
        } else {
            about = await PzAbout.create(data);
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