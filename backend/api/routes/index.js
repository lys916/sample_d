const { 
    createItem,
    nearbyItems,
    uploadPhoto,
    fetchMenu,
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
<<<<<<< HEAD
    server.route('/fetchMenu').get(fetchMenu);
=======
    server.route('/item').get(item);
    server.route('/menu').get(menu);
>>>>>>> 57be68a0e6258b1431d9ca6f9aba1be8826fab09
    // server.route('/items').get(findItems);
}