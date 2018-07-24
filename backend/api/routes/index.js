const { 
    createItem,
    nearbyItems,
    uploadPhoto,
    menu,
    addRating
 } = require('../controllers');

module.exports = server => {
    // server.route('/photo').post( uploadPhoto );
    server.route('/createItem').post(createItem);
    server.route('/addRating').post(addRating);
    server.route('/nearbyItems').get(nearbyItems);
    server.route('/menu').get(menu);
    // server.route('/items').get(findItems);
}