const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: Object,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    pageCount: {
        type: Number,
    },
    previewLink: {
        type: String,
        require: true
    },
    imageLink: {
        type: Object,
        default: ["../assets/flakes.jpg"]
    },
    googleBookId: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);

