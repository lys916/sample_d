const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./api/routes');
const fileUpload = require('express-fileupload');

const server = express();
const corsOptions = {
    "origin": (
        "http://localhost:3000",
        "https://delp-fe.herokuapp.com"
    ),
    "credentials": true,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan('combined'));
server.use(fileUpload());

routes(server);

module.exports = server;