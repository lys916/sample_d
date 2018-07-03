const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    name: {type: String, required: true},
    rating: [{type: Number}],
    venueId: {type: String}
});

module.exports = mongoose.model('Item', ItemSchema);