const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PhotoSchema = Schema({
    item_id: {type: ObjectId, ref: 'Item'},
    url: String,
    winPercent: Number
});

module.exports = mongoose.model('Photo', PhotoSchema);