const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
   name: {type: String, required: true},
   loginType: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   createdOn: {type: Date, default: Date.now},
   conCode: {type: Number},
   confirmed: {type: Boolean, default: false}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

