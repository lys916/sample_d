const { 
    createUser,
 } = require('../controllers');

module.exports = server => {
   server.route('/signup').post(createUser);
}