// Import express
const express = require('express');

// Import actions
const { find, findById, insert, update, remove, findPostComments, findCommentById, insertComment } = require('./data/db');

//Instantiate express app
const server = express();

// Initialise port to a variable
const port = 5000;

// Plug added functionalities to app
server.use(express.json());

server.get('/api/posts', (req, res) => {
  res.status(200).json({ message: 'found' })
})

server.post('/api/posts', (req, res) => {
  const content = req.body;
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { replacement } = req.body;
})

server.get('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const comment = req.body;
})

server.post('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const comment = req.body;
})


// Spin up server to listen for incoming changes
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
