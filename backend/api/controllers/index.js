const mongoose = require('mongoose');
const { uploadPhoto } = require('./files');
const Rating = require('../models/ratingModel');
const Item = require('../models/itemModel');
const Photo = require('../models/photoModel');

createItem = (req, res)=>{
	// NOTE:
	// this is where we save image to amazon by requiring uploadPhoto module
	// after saving the image successfully.. 
	// then we save image data to the database

	 // restaurantName: { type: String, required: true },
  //   itemName: { type: String, required: true },
  //   price: Number,
  //   category: [{ type: String }],
  //   cuisine: [{ type: String }],
  //   totalValueRatings: Number,
  //   numValueRatings: Number,
  //   spicyVotes: Number,
  //   instaVotes: Number,
  //   celebrateVotes: Number,
  //   photos: [{type: mongoose.Schema.Types.Mixed}],
  //   ratings: [{type: ObjectId, ref: 'Rating'}],

	console.log('CREATING FOOD ITEM');
	console.log(req.body);
	const {lat, long, name, selectedRestaurant, rating, review, price, imageURL, imageBlob} = req.body;
	// save rating
	if(rating){
		const newRating = new Rating();
		// rating.user_id = req.decoded.userId; // need to add user authenication
		if(review){
			newRating.review = review;
		}
		newRating.rating = rating;
		newRating.save().then(savedRating => {
			console.log('RATING SAVED');
			newItem = new Item();
			newItem.restaurantName = selectedRestaurant.name;
			newItem.name = name;
			newItem.lat = lat,
			newItem.long = long,
			newItem.price = price;
			// newItem.tags = tags;
			newItem.photos.push({url: 'https://www.rotinrice.com/wp-content/uploads/2015/07/IMG_6174.jpg'});
			newItem.ratings.push(savedRating._id);
			newItem.save().then(savedItem => {
				console.log('ITEM SAVED');
				res.json(savedItem);
			});
		});
	}
}

findItems = (req, res) => {
	console.log('req.params are', req.params);
	const { lat, lng } = req.params;
	Item.find({ $near: [ lng, lat ] })
		.then(items => {
			res.json(items);
		})
}

module.exports = {
	createItem,
	findItems
}