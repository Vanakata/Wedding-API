const mongoose = require('mongoose');

let guestSchema = new mongoose.Schema({
    firstName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    lastName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    isComing: {
        type: Boolean, default: false

    },
    weddingId: {
        type: String, default: ""
    }
});

let Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;