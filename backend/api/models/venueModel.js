const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = Schema({
    name: {type: String, required: true},
    items: [{type: mongoose.Schema.Types.Mixed}]
});

module.exports = mongoose.model('Restaurant', VenueSchema);