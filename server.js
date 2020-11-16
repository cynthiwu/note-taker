// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");
const db = require("./db/db.json");
const { runInNewContext } = require("vm");

const app = express();
const PORT = process.env.PORT || 8080;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static("public"));

// HTML route for Notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
});


// API routes
//Get route
app.get("/api/notes", function(req, res) {
    console.log(db);
    return res.json(db);
});

// Post
app.post("/api/notes", function(req, res) {

    const id = uniqid();
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: id,
    };
    db.push(newNote);

    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(db), function (err) {
        if (err) throw err;
    });

    res.json(db); 
});

// Delete

app.delete("/api/notes/:id", function (req,res) {

    const noteId = req.params.id;
    const index = db.findIndex((el) => el.id == noteId);
    db.splice(index, 1);

    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(db), function (err) {
        if (err) throw err;
    });
    
    res.json(db);
    console.log(noteId);
    console.log(index);
});

// HTML route for homepage 
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"))
});

// Listener
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
})