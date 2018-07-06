const mongoose = require('mongoose');
const Rating = require('../models/ratingModel');
const Item = require('../models/itemModel');

createItem = (req, res)=>{
	console.log('body in createItem', req.body);
	const {rating, location, review, name, tags, lat, long, price} = req.body;
	if(rating){
		const newRating = new Rating();
		// rating.user_id = req.decoded.userId; // need to add user authenication
		if(review){
			newRating.review = review;
		}
		newRating.rating = rating;
		newRating.save().then(savedRating => {
			console.log('saved Rating', savedRating);
			newItem = new Item();
			newItem.place_id = location.id;
			newItem.place_name = location.name;
			newItem.name = name;
			newItem.price = price;
			newItem.tags = tags;
			newItem.ratings.push(savedRating._id);
			newRating.save().then(savedItem => {
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
	findItems,
}