const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a blog title'],
        trim: true
    },
    shortDescription: {
        type: String,
        required: [true, 'Please add a short description for the card view']
    },
    mainContent: {
        type: String,
        required: [true, 'Please add main content for the detail page']
    },
    image: {
        type: String,
        required: [true, 'Please upload an image']
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
