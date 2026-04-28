const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

const getGallery = async (req, res, next) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        next(error);
    }
};

const addGalleryImage = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error('Please upload an image');
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
const updateGalleryImage = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            res.status(404);
            throw new Error('Gallery image not found');
        }

        if (req.file) {
            const oldImagePath = path.join(__dirname, '../../public', item.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            item.image = `/uploads/${req.file.filename}`;
        }

        item.altText = req.body.altText || item.altText;
        await item.save();
        res.json(item);
    } catch (error) {
        next(error);
    }
};

const deleteGalleryImage = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            res.status(404);
            throw new Error('Gallery image not found');
        }

        const imagePath = path.join(__dirname, '../../public', item.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await item.deleteOne();
        res.json({ message: 'Gallery image removed' });
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
