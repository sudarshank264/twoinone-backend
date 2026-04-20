const PzGallery = require('../models/PzGallery');
const Joi = require('joi');

const gallerySchema = Joi.object({
    altText: Joi.string().optional().allow('')
});

// @desc    Get all gallery images
// @route   GET /api/playzone/gallery
// @access  Public
const getGallery = async (req, res) => {
    try {
        const images = await PzGallery.find().sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching gallery' });
    }
};

// @desc    Add a gallery image
// @route   POST /api/playzone/gallery
// @access  Private/Admin
const addGalleryImage = async (req, res) => {
    try {
        const { error } = gallerySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const image = req.file ? `/uploads/${req.file.filename}` : null;
        if (!image) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const galleryItem = await PzGallery.create({
            image,
            altText: req.body.altText || 'Play zone gallery image'
        });

        res.status(201).json(galleryItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error adding gallery image' });
    }
};

// @desc    Delete a gallery image
// @route   DELETE /api/playzone/gallery/:id
// @access  Private/Admin
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
    deleteGalleryImage
};
