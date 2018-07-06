const mongoose = require('mongoose');
const Users = require('./userModel');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ItemSchema = Schema({
    place_id: { type: String, required: true },
    restaurantName: { type: String, required: true },
    itemName: { type: String, required: true },
    price: Number,
    category: [{ type: String }],
    cuisine: [{ type: String }],
    totalRatings: { type: Number, required: true },
    numRatings: { type: Number, required: true },
    totalValueRatings: Number,
    numValueRatings: Number,
    spicyVotes: Number,
    instaVotes: Number,
    celebrateVotes: Number,
    photos: [{
        urls: String,
        winPercent: Number,
        user_id: ObjectId,
    }],
    ratings: [{type: ObjectId, ref: 'Rating'}],
    // reviews: [{
    //     text: {
    //         type: String,
    //         maxLength: 50,
    //     },
    //     user_id: ObjectId,
    // }],
    // ratings: [{
    //     rating: Number,
    //     user_id: ObjectId,
    // }],
    // valueRatings: [{
    //     rating: Number,
    //     user_id: ObjectId,
    // }],
    spicyVote: Boolean,
    instaVote: Boolean,
    celebrateVote: Boolean,
});

module.exports = mongoose.model('Item', ItemSchema);