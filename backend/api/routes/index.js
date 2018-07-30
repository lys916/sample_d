const { 
    createItem,
    nearbyItems,
    uploadPhoto,
    fetchMenu,
    addRating,
    searchItems
 } = require('../controllers');

module.exports = server => {
    server.route('/uploadPhoto').post(uploadPhoto);
    server.route('/createItem').post(createItem);
    server.route('/addRating').post(addRating);
    server.route('/nearbyItems').get(nearbyItems);
    server.route('/searchItems').get(searchItems);
    server.route('/fetchMenu').get(fetchMenu);
    // server.route('/items').get(findItems);
}