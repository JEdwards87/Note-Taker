// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});

app.get("/", function (req, res) { //lookup (req, res) again tonigh
  res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});



app.get("/api/notes", function (req, res) {
  fs.readFile('db/db.json')
  res.send(data);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});