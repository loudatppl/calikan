const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema({
    boardId: String,
    name: String,
    description: String,

    deleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model( 'Board', BoardSchema );