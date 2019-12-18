const express = require("express"); //dependency express
const path = require("path"); //dependency path
const fs = require("fs"); //dependency file system
const app = express(); //set up app to use express
const PORT = process.env.PORT || 3000;

let noteId = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.use(express.static("public")); //serve css and html and js in folder named public
app.get("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
    if (err) { //if err end function
      return;
    }
    if (data === "") { //if db.json is empty end function
      return;
    }
    else { //parse json string
      res.json(JSON.parse(data));
    }
  });
});
app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  let updatedNotes = "";
  noteId++;
  newNote.id = noteId;
  fs.readFile("db/db.json", "utf8", function (err, noteString) {
    if (err) {
      return
    }
    const notes = JSON.parse(noteString)
    const noteJoin = [...notes, newNote]
    updatedNotes = JSON.stringify(noteJoin);
    fs.writeFile("db/db.json", updatedNotes, function (err) {
      if (err) {
        console.log(err)
        return
      }
      res.send(newNote);
    });
  });
})
app.delete("/api/notes/:id", function (req, res) {
  const deleteId = parseInt(req.params.id);
  fs.readFile("db/db.json", "utf8", function (err, noteString) {
    if (err) {
      return
    }
    const notes = JSON.parse(noteString);
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === deleteId) {
        notes.splice(i, 1);
        noteString = JSON.stringify(notes);
      }
    }
    fs.writeFile("db/db.json", noteString, function (err) {
      if (err) {
        return
      }
    });
  });
})
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.listen(PORT, function () { //start server
  console.log("App listening on PORT " + PORT);
});