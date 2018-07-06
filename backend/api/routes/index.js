const { 
    createItem,
    findItems
 } = require('../controllers');

module.exports = server => {
    server.route('/').post(createItem);
    server.route('/').get(findItems);
}