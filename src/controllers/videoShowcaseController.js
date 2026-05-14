const VideoShowcase = require('../models/VideoShowcase');

// @desc    Get video showcase by website type
// @route   GET /api/video-showcase/:websiteType
// @access  Public
const getVideoShowcase = async (req, res) => {
    try {
        const { websiteType } = req.params;
        const showcase = await VideoShowcase.findOne({ websiteType, isActive: true }).sort({ createdAt: -1 });

        if (!showcase) {
            return res.status(404).json({ success: false, message: 'Video showcase not found' });
        }

        res.status(200).json({ success: true, data: showcase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get all video showcases (for Admin)
// @route   GET /api/video-showcase
// @access  Private/Admin
const getAllVideoShowcases = async (req, res) => {
    try {
        const showcases = await VideoShowcase.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: showcases });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Create a new video showcase
// @route   POST /api/video-showcase
// @access  Private/Admin
const createVideoShowcase = async (req, res) => {
    try {
        const { websiteType, title, description, videoUrl, buttonText, buttonLink, relatedText, isActive } = req.body;

        const showcase = await VideoShowcase.create({
            websiteType,
            title,
            description,
            videoUrl,
            buttonText,
            buttonLink,
            relatedText,
            isActive
        });

        res.status(201).json({ success: true, data: showcase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Update video showcase
// @route   PUT /api/video-showcase/:id
// @access  Private/Admin
const updateVideoShowcase = async (req, res) => {
    try {
        let showcase = await VideoShowcase.findById(req.params.id);

        if (!showcase) {
            return res.status(404).json({ success: false, message: 'Video showcase not found' });
        }

        showcase = await VideoShowcase.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: showcase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Delete video showcase
// @route   DELETE /api/video-showcase/:id
// @access  Private/Admin
const deleteVideoShowcase = async (req, res) => {
    try {
        const showcase = await VideoShowcase.findById(req.params.id);

        if (!showcase) {
            return res.status(404).json({ success: false, message: 'Video showcase not found' });
        }

        await showcase.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getVideoShowcase,
    getAllVideoShowcases,
    createVideoShowcase,
    updateVideoShowcase,
    deleteVideoShowcase
};
