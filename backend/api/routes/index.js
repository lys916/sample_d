const { 
    createItem,
 } = require('../controllers');

module.exports = server => {
		server.route('/').post(createItem);
}