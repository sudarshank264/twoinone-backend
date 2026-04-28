const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    altText: {
        type: String,
        default: 'Gallery image'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
