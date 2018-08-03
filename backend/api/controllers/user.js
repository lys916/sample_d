const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userLogin = (req, res)=>{
	console.log('server.. user logging in', req.body );
	const { loginType, password } = req.body;
	User.findOne({ loginType }).then(user => {
		const userObject = {
			username: user.name,
			userId: user._id
		};
		if(!user){
			res.json({error: 'Wrong email or password'});
		}
		if(user){
			bcrypt.compare(password, user.password, function(err, valid) {
    			if(!valid){
    				res.json({error: 'Wrong email or password'});
    			}else{
    				console.log('user pwd is valid');
    				const token = jwt.sign(userObject, 'This is a secret string', { expiresIn: '1h' });
    				if(!user.confirmed){
    					console.log('user is not yet confirmed');
						res.json({ confirmed: user.confirmed, error: 'needConfirm', userId: user._id });
					}else{
						console.log('user is confirmed');
        				res.json({ token: token, userName: user.name, userId: user._id, confirmed: user.confirmed, error: null });
        			}
        		}
			});
		}
	});
}

userSignup = (req, res)=>{
	console.log('server - signing up');
	const { name, loginType, password } = req.body;
	const user = new User();
	user.name = name;
	user.loginType = loginType,
	user.conCode = '1234'; // randomly generate four string numbers

	bcrypt.hash(password, 11, (err, hash) => {
		if (err) throw err;
		user.password = hash;
		console.log('UserData', user);
		user.save().then(user => {
			console.log('user singed up!');
			const userObject = {
			username: user.name,
			userId: user._id
		};
			//NOTE: use nodemailer or twilo to send out confirmation number
			const token = jwt.sign(userObject, 'This is a secret string', { expiresIn: '1h' });
        		res.json({ token: token, username: user.name, confirmed: user.confirmed });
		}).catch(err=>{
			console.log('SIGN UP ERROR: ', err);
		});
	});
}

userConfirmation = (req, res)=>{
	console.log('confirming user');
	const { userId, conCode } = req.body;
	console.log('userid', userId);
	User.findById(userId).then(user => {
		if(!user){
			res.json({error: 'User does not exist'});
		} else {

			if(user.conCode === Number(conCode)){
				user.confirmed = true;
				user.save().then(updatedUser=>{
					const userObject = {
					username: updatedUser.name,
					userId: updatedUser._id
					}	
					console.log('server - user confirmed...');
					const token = jwt.sign(userObject, 'This is a secret string', { expiresIn: '1h' });
        			res.json({ token: token, userName: updatedUser.name, userId: updatedUser.userId, confirmed: true, error: null });
				});
			}	
		}
	});
}

module.exports = {
	userSignup,
	userLogin,
	userConfirmation
}