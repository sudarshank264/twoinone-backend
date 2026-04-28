const express = require('express');
const router = express.Router();
const { getGallery, addGalleryImage, deleteGalleryImage } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { updateGalleryImage } = require('../controllers/galleryController');

router.route('/')
    .get(getGallery)
    .post(protect, upload.single('image'), addGalleryImage);

router.route('/:id')
    .put(protect, upload.single('image'), updateGalleryImage)
    .delete(protect, deleteGalleryImage);

module.exports = router;
