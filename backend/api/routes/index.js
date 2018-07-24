const { 
    createItem,
    nearbyItems,
    uploadPhoto,
 } = require('../controllers');

module.exports = server => {
    server.route('/uploadPhoto').post(uploadPhoto);
    server.route('/createItem').post(createItem);
    server.route('/nearbyItems').get(nearbyItems);
    // server.route('/items').get(findItems);
}