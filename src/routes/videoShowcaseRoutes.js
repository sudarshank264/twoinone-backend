const express = require('express');
const router = express.Router();
const {
    getVideoShowcase,
    getAllVideoShowcases,
    createVideoShowcase,
    updateVideoShowcase,
    deleteVideoShowcase
} = require('../controllers/videoShowcaseController');
const { protect } = require('../middleware/authMiddleware');

// Get specific active video showcase by website type (public)
router.get('/type/:websiteType', getVideoShowcase);

// Admin routes
router.route('/')
    .get(protect, getAllVideoShowcases)
    .post(protect, createVideoShowcase);

router.route('/:id')
    .put(protect, updateVideoShowcase)
    .delete(protect, deleteVideoShowcase);

module.exports = router;
