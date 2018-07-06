const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const RatingSchema = Schema({
    user_id: {type: ObjectId, ref: 'Item'},
    // photo: {type: ObjectId, ref: 'Item'},
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

module.exports = mongoose.model('Rating', RatingSchema);
