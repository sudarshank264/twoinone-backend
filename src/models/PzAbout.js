const mongoose = require('mongoose');

const pzAboutSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'About House of Play'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PzAbout', pzAboutSchema);
