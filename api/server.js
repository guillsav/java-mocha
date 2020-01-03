const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// Routers
const coffeemakersRouter = require('../ressources/coffemakers/coffemakers-route.js');
const flavorsRouter = require('../ressources/flavors/flavors-route.js');

const server = express();

// Global Middlewares
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// Route Middlewares
server.use('/api/coffeemakers', coffeemakersRouter);
server.use('api/flavors', flavorsRouter);

server.get('/', (req, res) => {
    res.status(200).json({Welcome_to: `Java Mocha!`});
});

module.exports = server;
