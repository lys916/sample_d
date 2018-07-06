const { 
    createItem,
    findItems
 } = require('../controllers');

module.exports = server => {
    server.route('/createItem').post(createItem);
    server.route('/items').get(findItems);
}