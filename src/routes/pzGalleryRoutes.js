const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

const {
    getGallery,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage
} = require('../controllers/pzGalleryController');

// @route   GET /api/gallery
// @desc    Get all gallery images
router.route('/')
    .get(getGallery)
    .post(protect, upload.single('image'), addGalleryImage);

// @route   PUT, DELETE /api/gallery/:id
// @desc    Update or delete gallery image
router.route('/:id')
    .put(protect, upload.single('image'), updateGalleryImage)
    .delete(protect, deleteGalleryImage);

module.exports = router;