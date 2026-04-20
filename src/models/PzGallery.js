const mongoose = require('mongoose');

const pzGallerySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    altText: {
        type: String,
        default: 'Play zone gallery image'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PzGallery', pzGallerySchema);
