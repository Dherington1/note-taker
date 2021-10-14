const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

router.post("/notes", (req, res) => {
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8")
  );

  const body = req.body;
  body.id = uuidv4();
  notes.push(body);

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"), JSON.stringify(notes), "utf-8"
  );

  res.json(body);
});

// get our posted notes
router.get("/notes", (req, res) => {
  // reads file from our db folder file
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8")
  );

  // sends data to page as json
  res.json(notes);
});

module.exports = router;


// npm run watch 