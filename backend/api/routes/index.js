const { 
    createItem,
    findRatings
 } = require('../controllers');

module.exports = server => {
    server.route('/').post(createItem);
    server.route('/venues').get(findRatings);
}