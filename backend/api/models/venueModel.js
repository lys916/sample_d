const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = Schema({
    name: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);