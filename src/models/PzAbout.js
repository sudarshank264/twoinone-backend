const mongoose = require('mongoose');

const pzAboutSchema = new mongoose.Schema({
    heroTitle: { type: String },
    heroSubtitle: { type: String },
    heroImage: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    contactAddress: { type: String },
    aboutTitle: { type: String },
    aboutText: { type: String },
    text: { type: String }, // Legacy field mapping
    image: { type: String }, // Legacy field mapping
    aboutImage: { type: String },
    features: [{
        title: { type: String },
        desc: { type: String },
        icon: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('PzAbout', pzAboutSchema);
