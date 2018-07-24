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
			newItem.restaurantId = selectedRestaurant.id;
			newItem.name = name;
			newItem.lat = lat,
			newItem.long = long,
			newItem.loc.coordinates = [long, lat],
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

addRating = (req, res)=>{
	// NOTE:
	// this is where we save image to amazon by requiring uploadPhoto module
	// after saving the image successfully.. 
	// then we save image data to the database
	console.log(req.body);
	const {lat, id, long, name, selectedRestaurant, rating, review, price, imageURL, imageBlob} = req.body;
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
			Item.findById(id).then(item=>{
				item.ratings.push(savedRating._id);
				//if user include a photo
				if(imageBlob){
					item.photos.push({url: 'https://www.rotinrice.com/wp-content/uploads/2015/07/IMG_6174.jpg'});
				}
				item.save().then(updatedItem=>{
					res.json(updatedItem);
				}).catch(err => console.log(err));
			}).catch(err => console.log(err));
		});
	}
}

nearbyItems = (req, res) => {
	const { lat, long } = req.query;
	const locQuery = (coords, distance) => {
    return { loc: { $near: { $geometry: { type: "Point", coordinates: coords }, $maxDistance: parseInt(distance)}}}
	}
	Item.find(locQuery([long, lat], 400))
		.populate('ratings')
		.then(items => {
			res.json(items);
		})
		.catch(err => {
			console.log(err);
		})
}

menu = (req, res) => {
	const { id } = req.query;
	Item.find({restaurantId: id})
		.then(items => {
			res.json(items);
		})
		.catch(err => {
			console.log(err);
		})
}

module.exports = {
	createItem,
	nearbyItems,
	menu,
	addRating
}