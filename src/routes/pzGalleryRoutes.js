const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
    getGallery,
    addGalleryImage,
    deleteGalleryImage
} = require('../controllers/pzGalleryController');

router.route('/')
    .get(getGallery)
    .post(protect, upload.single('image'), addGalleryImage);

router.route('/:id')
    .delete(protect, deleteGalleryImage);

module.exports = router;
