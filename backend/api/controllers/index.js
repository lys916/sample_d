const Item = require('../models/itemModel');
const mongoose = require('mongoose');

createItem = (req, res)=>{
	console.log('body in createItem controller', req.body);
	const {rated, venueId, itemName} = req.body.name;
	Item.findOne({ venueId }).then(item=>{
		if(item){
			item.rating.push(rated);
			item.save().then(saved=>{
				res.json(saved);
			});
		}else{
			const item = new Item();
			item.venueId = venueId;
			item.name = itemName;
			item.rating.push(rated);
			item.save().then(saved=>{
				res.json(saved);
			});
		}
		
	});
}

module.exports = {createItem}