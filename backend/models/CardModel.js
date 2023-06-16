const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    cardId: String,
    task: String,
    status: String,
    sourceBoard: String,

    deleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model( 'Card', CardSchema );