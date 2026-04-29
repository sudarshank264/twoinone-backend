const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    age: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    service: {
        type: String
    },
    message: {
        type: String
    },
    source: {
        type: String,
        enum: ['doctor', 'playzone'],
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'resolved'],
        default: 'new'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
