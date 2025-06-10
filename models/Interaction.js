const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
            required: true
        },
        type: {
            type: String,
            enum: ['Call', 'Email', 'Meeting', 'Task'],
            required: true
        },
        notes: {
            type: String,
            default: ''
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Interaction', InteractionSchema);