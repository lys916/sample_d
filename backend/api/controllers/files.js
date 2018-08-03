const AWS = require('aws-sdk');
require('dotenv').config();
const uuidv4 = require('uuid-v4');
// const jwt = require("jsonwebtoken");
// const mySecret = process.env.SECRET || "random";
const bucket = process.env.S3_BUCKET_NAME;

AWS.config.update({ 
	accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
});

const uploadPhoto = (req, res) => {
    const file = req.files.file.data; 
    const type = req.files.file.mimetype;
    const name = `IMG_${uuidv4()}`;

    const s3 = new AWS.S3();
    const s3Params = {
        Body: file,
        Bucket: bucket,
        Key: name,
        Expires: 60,
        ContentType: type,
        ACL: 'public-read'
    };
    // saves file on s3 server
    s3.putObject(s3Params, (err, data) => {
        if(err) console.log('error in putObject', err);
        else console.log('object saved', data);
    });

    // gets info on the file and saves it to the user resume
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log('error in getSignedUrl', err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://s3.amazonaws.com/${bucket}/${name}`
        };
        res.status(200).json(returnData);
    });
};

module.exports = {
  uploadPhoto,
};
