const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    heroTitle: { type: String },
    heroSubtitle: { type: String },
    heroImage: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    contactAddress: { type: String },
    aboutTitle: { type: String },
    aboutText: { type: String },
    aboutImage: { type: String },
    features: [{
        title: { type: String },
        desc: { type: String },
        icon: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
