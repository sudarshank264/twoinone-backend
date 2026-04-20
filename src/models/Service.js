const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a service title'],
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

module.exports = mongoose.model('Service', serviceSchema);
