const About = require('../models/About');
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
    features: Joi.any()
}).unknown(true);

// @desc Get About
const getAbout = async (req, res, next) => {
    try {
        const about = await About.findOne();
        res.json(about || {});
    } catch (error) {
        next(error);
    }
};

// @desc Add or Update About
const addOrUpdateAbout = async (req, res, next) => {
    try {
        // Validate
        const { error, value } = aboutSchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
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

        let about = await About.findOne();

        if (about) {
            about.set(data);
            await about.save();
            return res.json(about);
        } else {
            const newAbout = await About.create(data);
            return res.status(201).json(newAbout);
        }

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAbout,
    addOrUpdateAbout
};