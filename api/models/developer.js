const mongoose = require('mongoose');

const developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    background: String
});

module.exports = mongoose.model('developer', developerSchema);