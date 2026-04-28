const mongoose = require('mongoose');

// Reusable feature schema
const featureSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    desc: { type: String, trim: true },
    icon: { type: String }
});

const aboutSchema = new mongoose.Schema({
    heroTitle: { type: String, trim: true },
    heroSubtitle: { type: String, trim: true },
    heroImage: { type: String },

    contactPhone: { type: String },
    contactEmail: { type: String },
    contactAddress: { type: String },

    aboutTitle: {
        type: String,
        default: 'About Us',
        trim: true
    },
    aboutText: { type: String, trim: true },
    aboutImage: { type: String },

    // Features section (reusable schema)
    features: [featureSchema]

}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);