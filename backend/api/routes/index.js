const { 
    createItem,
    nearbyItems,
    uploadPhoto,
    menu,
    addRating,
    searchItems,
    item
 } = require('../controllers');

module.exports = server => {
    server.route('/uploadPhoto').post(uploadPhoto);
    server.route('/createItem').post(createItem);
    server.route('/addRating').post(addRating);
    server.route('/nearbyItems').get(nearbyItems);
    server.route('/searchItems').get(searchItems);
    server.route('/item').get(item);
    server.route('/menu').get(menu);
    // server.route('/items').get(findItems);
}