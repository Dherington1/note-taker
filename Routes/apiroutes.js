const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

router.post("/notes", (req, res) => {
  // reads file from our db folder file
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8"));

  // connects to the body 
  const body = req.body;
  // creates a random number for our note (like ID)
  body.id = uuidv4();

  // pushes our note to the posted notes part of page (left side)
  notes.push(body);

  // writes our notes to our db file as a string
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), "utf-8");

  // sends data to the page as json
  res.json(body);
});

// get our posted notes
router.get("/notes", (req, res) => {
  // reads file from our db folder file
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8"));

  // sends data to page as json
  res.json(notes);
});


router.delete('/notes/:id', (req, res) => {


  // read db.json, filter and write db.json
  const { id } = req.params;
  let savedNotes;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
      const oldNotes = JSON.parse(data);

      if (err) {
          res.status(500).send(err);
      }

      savedNotes = oldNotes.filter((note) => {
          return note.id !== id;
      });
      
      fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
          if (err) {
              res.status(500).send(err);
          }
      });
      res.send(savedNotes)
  });  
})

module.exports = router;


// npm run watch 
