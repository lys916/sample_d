const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = Schema({
    name: {type: String, required: true},
    rating: {type: Number},
    items: [{type: mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model('Item', VenueSchema);