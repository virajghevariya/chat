const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    message:{
        type: [String, Number],
        required: [true, 'Please add a message']
    }
});

module.exports = mongoose.model('Message', MessageSchema);