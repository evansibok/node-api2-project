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

// GETS
server.get('/api/posts', (req, res) => {
  find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        error: "The posts information could not be retrieved.",
        stack: error.stack,
      });
    });
})

server.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;

  const idCheck = await findById(id);

  // Is post with ID found? No - Return 404, Yes - Proceed to fetch post
  if (!idCheck.length) {
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  } else {
    // Does fetch return post? Yes - Return 200, No - Return 500
    findById(id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        res.status().json({
          error: "The post information could not be retrieved.",
          stack: error.stack
        });
      });
  }

})

server.get('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const comment = req.body;
})

// POSTS
server.post('/api/posts', (req, res) => {
  const content = req.body;

  // Is title || contents available? No - Return 400 error, Yes - Check if the post information is valid
  if (!content.title || !content.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {

    // Is post information valid? No - Return error, Yes - send 201 with posts
    insert(content)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(error => {

        // Is there error when saving post? Send 500
        res.status(500).json({ error: "There was an error while saving the post to the database" });
      });
  }
});

server.post('/api/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const idCheck = await findById(id);

  // Is ID found? No - Return 404,
  if (!idCheck.length) {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
  } else {

    // Is comment.text available? No - Return 400, Yes - Return 201
    if (!text) {
      res.status(400).json({ errorMessage: "Please provide text for the comment." });
    } else {
      insertComment({ text, post_id: id })
        .then(data => {
          res.status(201).json(data);
        })
        .catch(error => {
          // Default to return 500 for unsuccessful posting
          res.status(500).json({
            error: "There was an error while saving the comment to the database",
            stack: error.stack
          });
        });
    }
  }
})

// DELETE
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
})

// PUT
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { replacement } = req.body;
})





// Spin up server to listen for incoming changes
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
