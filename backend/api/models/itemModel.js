const mongoose = require('mongoose');
const Users = require('./userModel');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ItemSchema = Schema({
    place: {type: mongoose.Schema.Types.Mixed},
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
    totalValueRatings: Number,
    numValueRatings: Number,
    spicyVotes: Number,
    instaVotes: Number,
    celebrateVotes: Number,
    photos: [{type: mongoose.Schema.Types.Mixed}],
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
ItemSchema.index({'loc': '2dsphere'});
module.exports = mongoose.model('Item', ItemSchema);