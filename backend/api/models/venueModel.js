const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = Schema({
    name: {type: String, required: true},
    rating: {type: Number},
    items: [{type: mongoose.Schema.Types.Mixed}]
});

module.exports = mongoose.model('Item', VenueSchema);