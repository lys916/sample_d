const mongoose = require('mongoose');
const Users = require('./userModel');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ItemSchema = Schema({
    place: {type: mongoose.Schema.Types.Mixed},
    placeId: {type: String, required: true},
    loc: {
        type: {
            type: "String",
            required: true,
            enum: ['Point', 'LineString', 'Polygon'],
            default: 'Point'
        },
        coordinates: [Number]
    },
    name: { type: String, required: true },
    price: Number,
    category: [{ type: String }],
    cuisine: [{ type: String }],
    totalRating: Number,
    totalValueRating: Number,
    spicyVotes: Number,
    instaVotes: Number,
    celebrateVotes: Number,
    photos: [{
        url: String,
        winPercent: Number
    }],
    reviews: [{
        text: {
            type: String,
            maxLength: 50,
        },
        rating: Number,
        user_id: {type: ObjectId, ref: 'User'},
    }],

    valueRatings: [{
        rating: Number,
        user_id: ObjectId,
    }],
    spicyVote: Boolean,
    instaVote: Boolean,
    celebrateVote: Boolean,
});
ItemSchema.index({'loc': '2dsphere'});
module.exports = mongoose.model('Item', ItemSchema);