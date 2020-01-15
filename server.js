// Import express
const express = require('express');

// Import Posts Router
const postsRouter = require('./data/posts-router');

//Instantiate express app
const server = express();

// Plug added functionalities to app
server.use(express.json());
server.use('/api/posts', postsRouter);

// Expose server for use by external file
module.exports = server;