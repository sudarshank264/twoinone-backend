const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

const {
    getVideos,
    createVideo,
    updateVideo,
    deleteVideo
} = require('../controllers/videoController');

// @route   GET /api/videos/type/:websiteType
router.get('/type/:websiteType', getVideos);

// @route   POST /api/videos
router.post('/', protect, upload.single('video'), createVideo);

// @route   PUT, DELETE /api/videos/:id
router.route('/:id')
    .put(protect, upload.single('video'), updateVideo)
    .delete(protect, deleteVideo);

module.exports = router;
