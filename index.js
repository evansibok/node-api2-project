const server = require('./server');

// Initialise port to a variable
const port = 5000;

// Spin up server to listen for incoming changes
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
