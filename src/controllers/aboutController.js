const About = require('../models/About');
const joi = require('joi');

const aboutSchema = joi.object({
    heroTitle: joi.string().allow('', null),
    heroSubtitle: joi.string().allow('', null),
    contactPhone: joi.string().allow('', null),
    contactEmail: joi.string().allow('', null),
    contactAddress: joi.string().allow('', null),
    aboutTitle: joi.string().allow('', null),
    aboutText: joi.string().allow('', null),
    features: joi.any()
}).unknown(true);

const getAbout = async (req, res, next) => {
    try {
        const about = await About.findOne();
        if (!about) {
            return res.status(404).json({ message: 'About content not found' });
        }
        res.json(about);
    } catch (error) {
        next(error);
    }
};

const addOrUpdateAbout = async (req, res, next) => {
    try {
        const { error } = aboutSchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
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

        let about = await About.findOne();

        if (about) {
            Object.assign(about, updateData);
            const updatedAbout = await about.save();
            return res.json(updatedAbout);
        } else {
            const newAbout = await About.create(updateData);
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
