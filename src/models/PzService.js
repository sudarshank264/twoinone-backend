const mongoose = require('mongoose');

const pzServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'FaSmile' // default react-icon name
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PzService', pzServiceSchema);
