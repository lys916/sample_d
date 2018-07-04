const Item = require('../models/itemModel');
const mongoose = require('mongoose');

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

findRatings = (req, res) => {
	const venueId = req.get('venueId');
	Item.find({ venueId })
		.then(items => {
			res.json(items);
		})
}

module.exports = {
	createItem,
	findRatings,
}