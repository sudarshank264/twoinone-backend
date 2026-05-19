const Video = require('../models/Video');
const fs = require('fs');
const path = require('path');

// @desc    Get all videos by website type
// @route   GET /api/videos/type/:websiteType
// @access  Public
const getVideos = async (req, res) => {
    try {
        const videos = await Video.find({ websiteType: req.params.websiteType }).sort({ createdAt: -1 });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a video
// @route   POST /api/videos
// @access  Private
const createVideo = async (req, res) => {
    try {
        const { title, type, websiteType } = req.body;
        let videoUrl = '';

        if (type === 'upload') {
            if (!req.file) {
                return res.status(400).json({ message: 'Please upload a video file' });
            }
            videoUrl = `/uploads/${req.file.filename}`;
        } else {
            videoUrl = req.body.videoUrl;
            if (!videoUrl) {
                return res.status(400).json({ message: 'Please provide a video URL' });
            }
        }

        const video = new Video({
            title,
            videoUrl,
            type,
            websiteType
        });

        const createdVideo = await video.save();
        res.status(201).json(createdVideo);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a video
// @route   PUT /api/videos/:id
// @access  Private
const updateVideo = async (req, res) => {
    try {
        const { title, type, videoUrl, isActive } = req.body;
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        video.title = title || video.title;
        if (isActive !== undefined) {
            video.isActive = isActive;
        }

        if (type === 'upload' && req.file) {
            // Delete old video if it was an upload
            if (video.type === 'upload' && video.videoUrl) {
                const oldPath = path.join(__dirname, '../../public', video.videoUrl);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            video.type = 'upload';
            video.videoUrl = `/uploads/${req.file.filename}`;
        } else if (type === 'link') {
            video.type = 'link';
            video.videoUrl = videoUrl;
        }

        const updatedVideo = await video.save();
        res.json(updatedVideo);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private
const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        if (video.type === 'upload' && video.videoUrl) {
            const videoPath = path.join(__dirname, '../../public', video.videoUrl);
            if (fs.existsSync(videoPath)) {
                fs.unlinkSync(videoPath);
            }
        }

        await video.deleteOne();
        res.json({ message: 'Video removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getVideos,
    createVideo,
    updateVideo,
    deleteVideo
};
