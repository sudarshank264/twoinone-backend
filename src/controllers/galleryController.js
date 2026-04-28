const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

// Validation schema
const gallerySchema = Joi.object({
    altText: Joi.string().optional().allow('')
});

// @desc    Get all gallery images
const getGallery = async (req, res, next) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

// @desc    Add gallery image
const addGalleryImage = async (req, res, next) => {
    try {
        const { error } = gallerySchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        if (!req.file) {
            res.status(400);
            throw new Error('Image file is required');
        }

        const item = await Gallery.create({
            image: `/uploads/${req.file.filename}`,
            altText: req.body.altText || 'Gallery image'
        });

        res.status(201).json(item);

    } catch (error) {
        next(error);
    }
};

// @desc    Update gallery image
const updateGalleryImage = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            res.status(404);
            throw new Error('Gallery image not found');
        }

        // Update alt text
        if (req.body.altText !== undefined) {
            item.altText = req.body.altText;
        }

        // Replace image (delete old one)
        if (req.file) {
            const oldImagePath = path.join(__dirname, '../../public', item.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            item.image = `/uploads/${req.file.filename}`;
        }

        await item.save();
        res.status(200).json(item);

    } catch (error) {
        next(error);
    }
};

// @desc    Delete gallery image
const deleteGalleryImage = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            res.status(404);
            throw new Error('Gallery image not found');
        }

        // Delete file from server
        const imagePath = path.join(__dirname, '../../public', item.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await item.deleteOne();
        res.status(200).json({ message: 'Gallery image removed' });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getGallery,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage
};