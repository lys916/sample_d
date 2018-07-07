const { 
    createItem,
    findItems,
    uploadPhoto,
 } = require('../controllers');

module.exports = server => {
    server.route('/').post(createItem);
    server.route('/').get(findItems);
    server.route('/photo').post( uploadPhoto );
}