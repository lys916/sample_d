const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = Schema({
    name: {type: String, required: true},
    rating: {type: Number},
    items: [{type: mongoose.Schema.Types.Mixed}]
});

const ItemSchema = Schema({
    name: {type: String, required: true},
    rating: [{type: Number}],
    id: {type: String}
});

module.exports = mongoose.model('Item', ItemSchema);