const PzGallery = require('../models/PzGallery');
const Joi = require('joi');

const gallerySchema = Joi.object({
    altText: Joi.string().optional().allow('')
});

// Get all
const getGallery = async (req, res) => {
    try {
        const images = await PzGallery.find().sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching gallery' });
    }
};

// Add image
const addGalleryImage = async (req, res) => {
    try {
        const { error } = gallerySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const galleryItem = await PzGallery.create({
            image: `/uploads/${req.file.filename}`,
            altText: req.body.altText || 'Play zone gallery image'
        });

        res.status(201).json(galleryItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error adding gallery image' });
    }
};

// ✅ SINGLE update function
const updateGalleryImage = async (req, res) => {
    try {
        const { error } = gallerySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const galleryItem = await PzGallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery image not found' });
        }

        // update fields
        if (req.body.altText !== undefined) {
            galleryItem.altText = req.body.altText;
        }

        if (req.file) {
            galleryItem.image = `/uploads/${req.file.filename}`;
        }

        await galleryItem.save();
        res.status(200).json(galleryItem);

    } catch (error) {
        res.status(500).json({ message: 'Server Error updating gallery image' });
    }
};

// Delete
const deleteGalleryImage = async (req, res) => {
    try {
        const galleryItem = await PzGallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery image not found' });
        }

        await galleryItem.deleteOne();
        res.status(200).json({ message: 'Gallery image removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error deleting gallery image' });
    }
};

module.exports = {
    getGallery,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage
};