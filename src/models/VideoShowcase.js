const mongoose = require('mongoose');

const videoShowcaseSchema = new mongoose.Schema({
  websiteType: {
    type: String,
    enum: ['doctor', 'playzone'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Book Appointment'
  },
  buttonLink: {
    type: String,
    default: '/appointment'
  },
  relatedText: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('VideoShowcase', videoShowcaseSchema);
