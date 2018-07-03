const Item = require('../models/itemModel');
const mongoose = require('mongoose');

createItem = (req, res)=>{
	const {rating, id, name} = req.body;
	Item.findOne({id}).then(item=>{
		if(item){
			res.rating.push(rating);
			res.save().then(saved=>{
				res.json(saved);
			});
		}else{
			const item = new Item();
			item.venueId = id;
			item.name = name;
			item.rating.push(rating);
			item.save().then(saved=>{
				res.json(saved);
			});
		}
		
	});
}

module.exports = {createItem}