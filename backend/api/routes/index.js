const { 
    createItem,
    findItems,
    uploadPhoto,
 } = require('../controllers');

module.exports = server => {
    // server.route('/photo').post( uploadPhoto );
    server.route('/createItem').post(createItem);
    server.route('/items').get(findItems);
}