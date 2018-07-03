const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./api/routes');
const mongoose = require('mongoose');

const server = express();
const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true,
};




// // *** from app.js .. couldn't get server running
// // const server = require('./server');
// const port = process.env.PORT || 5000;
// const user = process.env.MLAB_USERNAME || "delp";
// const pass = process.env.MLAB_PASSWORD || "delp123";
// mongoose.Promise = global.Promise;

// mongoose
//   .connect(`mongodb://${user}:${pass}@ds123971.mlab.com:23971/delp`)
//   .then(result => {
//     console.log('Mongo Connected');
//   })
//   .catch(error => {
//     console.log('Error connecting to Mongo.', error);
//   });


// // ***





server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan('combined'));

routes(server);

// server.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// });

module.exports = server;