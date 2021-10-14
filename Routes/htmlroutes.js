// our router that connects our app from server.js
const router = require("express").Router();
// defines variable for path to be used
const path = require("path");

// connect our user to the home page
router.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, '../public/index.html'));

});

// connect our user to the notes HTML
router.get('/notes', (req, res) => {

  res.sendFile(path.join(__dirname, '../public/notes.html'));

});

// this will help catch an error if a user tries to go to a url that doesnt exist
router.get('*', (req, res) => {
  // send user back to homepage

  res.sendFile(path,join(__dirname, '../public/index.html'));
});

module.exports = router;