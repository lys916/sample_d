const mongoose = require('mongoose');
const { uploadPhoto } = require('./files');
const Item = require('../models/itemModel');

createItem = (req, res)=>{
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
	const {name, selectedRestaurant, rating, review, price, imageUrl } = req.body;
	// check to see if required items are passed
	if(name && selectedRestaurant){
		// need to add user authenication
		const {lat, lng} = selectedRestaurant.geometry.location;
		newItem = new Item();
		if (review) newItem.reviews.push({ text: review.text });
		if (imageUrl) newItem.photos.push({ url: imageUrl });
		if (price) newItem.price = price;
		if (rating) {
			newItem.ratings.push({ rating });
			newItem.averageRating = rating;
		}
		newItem.place = selectedRestaurant;
		newItem.placeId = selectedRestaurant.id;
		newItem.name = name;
		newItem.lat = lat;
		newItem.long = lng;
		newItem.loc.coordinates = [lng, lat];
		// newItem.tags = tags;
		newItem.save()
			.then(savedItem => {
				console.log('ITEM SAVED');
				res.json(savedItem);
			})
			.catch(err => res.error({ 'error creating new item': err }));
	} else {
		res.status(400).json({ error: 'must select a restaurant and provide item name'})
	}
}

addRating = (req, res)=>{
	// NOTE:
	// this is where we save image to amazon by requiring uploadPhoto module
	// after saving the image successfully.. 
	// then we save image data to the database
	console.log('req.body in addRating controller', req.body);
	const {lat, id, long, name, selectedRestaurant, rating, review, price, imageUrl, imageBlob} = req.body;
	// save rating (and user to this)
	if (rating) {
		// need to add user authenication
		const update = {
			$push: { ratings: rating },
			$inc: { totalRating: rating },
		}
		if (imageUrl) update[$push][photos] = { url: imageUrl };
		if (review) update[$push][reviews] = { text: review.text };
		console.log('update doc pre-update', update);
		Item.findByIdAndUpdate(id, update, { new: true })
			.then(updatedItem=>{ res.json(updatedItem); })
			.catch(err => res.status(500).json({ 'error updating item in addRating': err }));
	} else res.status(400).json({ error: 'must provide a rating' });
}

nearbyItems = (req, res) => {
	const { lat, long } = req.query;
	const locQuery = (coords, distance) => {
    	return { loc: { $near: { $geometry: { type: "Point", coordinates: coords }, $maxDistance: parseInt(distance)}}}
	}
	const oneMile = 1609.34;
	Item.find(locQuery([long, lat], oneMile*3))
		.populate('ratings')
		.then(items => {
			res.json(items);
		})
		.catch(err => {
			console.log(err);
		})
}

searchItems = (req, res) => {
	console.log();
	const { type, term, lat, long, location } = req.query;
		const locQuery = (coords, distance) => {
    	return { loc: { $near: { $geometry: { type: "Point", coordinates: coords }, $maxDistance: parseInt(distance)}}, name: { "$regex": term, "$options": "i" }}
		}
		const oneMile = 1609.34;
		Item.find(locQuery([long, lat], oneMile*20))
		.populate('ratings')
		.then(items => {
			res.json(items);
		})
		.catch(err => {
			console.log(err);
		})	
}

fetchMenu = (req, res) => {
	const { id } = req.query;
	console.log('id in menu is', id);
	Item.find({ "place.id": id })
		.then(items => {
			console.log('items returned in fetchMenu is', items);
			res.json(items);
		})
		.catch(err => {
			console.log(err);
		})
}

item = (req, res) => {
	const { id } = req.query;
	Item.findById(id)
		.populate('ratings')
		.then(item => {
			res.json(item);
		})
		.catch(err => {
			console.log(err);
		})
}

module.exports = {
	createItem,
	nearbyItems,
	uploadPhoto,
	fetchMenu,
	addRating,
	searchItems,
	item
}