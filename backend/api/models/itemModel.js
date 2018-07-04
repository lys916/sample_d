const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    itemId: {type: String, required: true},
    rating: [{type: Number}],
    venueId: {type: String, required: true}
});

module.exports = mongoose.model('Item', ItemSchema);