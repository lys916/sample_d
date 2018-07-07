const server = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const user = process.env.MLAB_USERNAME || "delp";
const pass = process.env.MLAB_PASSWORD || "delp123";
mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost:27017/Dishes')
  // .connect(`mongodb://${user}:${pass}@ds123971.mlab.com:23971/delp`)
  .then(result => {
    console.log('Mongo Connected');
  })
  .catch(error => {
    console.log('Error connecting to Mongo.', error);
  });

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});