const About = require('../models/About');
const joi = require('joi');

const aboutSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required()
});

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

        let about = await About.findOne();

        if (about) {
            about.title = req.body.title;
            about.description = req.body.description;
            const updatedAbout = await about.save();
            return res.json(updatedAbout);
        } else {
            const newAbout = await About.create(req.body);
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
