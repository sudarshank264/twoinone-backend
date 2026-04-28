const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true
    },
    altText: {
        type: String,
        default: 'Gallery image',
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);