const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ItemRatingSchema = Schema({
    item_id: ObjectId,
    user_id: ObjectId,
    photo: {
        urls: String,
        winPercent: Number,
    },
    review: {
        type: String,
        maxLength: 50,
    },
    rating: Number,
    valueRating: Number,
    spicyVote: Boolean,
    instaVote: Boolean,
    celebrateVote: Boolean,
});

module.exports = mongoose.model('ItemRating', ItemRatingSchema);