const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types,ObjectId,
        ref: 'Client',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    stage: {
        type: String,
        enum: ['Prospect', 'Proposal', 'Review', 'Closeed Won', 'Closed Lost'],
        default: 'Prospect'
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Sale', SaleSchema);