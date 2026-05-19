const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['upload', 'link'],
        default: 'upload'
    },
    websiteType: {
        type: String,
        enum: ['doctor', 'playzone'],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);
