const Item = require('../models/itemModel');
const mongoose = require('mongoose');
const { uploadPhoto } = require('./files');

createItem = (req, res)=>{
	console.log('body in createItem controller', req.body);
	const {rated, venueId, itemId} = req.body.itemId;
	Item.findOne({ itemId }).then(item=>{
		if(item){
			item.rating.push(rated);
			item.save().then(saved=>{
				res.json(saved);
			});
		}else{
			const item = new Item();
			item.venueId = venueId;
			item.itemId = itemId;
			item.rating.push(rated);
			item.save().then(saved=>{
				res.json(saved);
			});
		}
	});
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
	uploadPhoto,
}