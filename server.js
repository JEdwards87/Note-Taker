const express = require("express"); //dependency express
const path = require("path"); //dependency path
const fs = require("fs"); //dependency file system

const app = express(); //Sets up express app
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); // Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.static('public'));

app.get("/", function (req, res) { // Route to index page
  res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});
app.get("/notes", function (req, res) { // Route to notes page
  res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});
app.get("/api/notes", function (req, res) { // Route to db.json file
  res.sendFile(path.join(__dirname, "/Develop/db/db.json"));
});
// app.post("/api/notes", function (req, res) {
//   app.post("/api/notes", function (req, res) {
//     fs.readFile(path.join(__dirname, "db.json"));
//   });
// });








