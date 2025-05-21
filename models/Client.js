const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    physicalAddress: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Client', ClientSchema);
