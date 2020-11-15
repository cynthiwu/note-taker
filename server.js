// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");
const db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 8080;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static("public"));
app.use(express.static("db"));


// HTML routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"))
});

// API routes
//Get
app.get("/api/notes", function(req, res) {
    return res.json(db);
    // let dataObj = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json")));
    // console.log(dataObj);
    // res.json(dataObj);
});

// Post
// app.post("/api/notes", function(req, res) {

//     const id = uniqid();
//     const newNote = {
//         title: req.body.title,
//         text: req.body.text,
//         id: id
//     };

//     const dataArray = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json")));
    
//     dataArray.push(newNote);

//     fs.writeFile(path.join(__dirname, "/db/db.json"), JSOfN.stringify(dataArray), function (err) {
//         if (err) throw err;
//     });

//     console.log(dataArray);
//     res.json(dataArray); 
// });

// Delete

// app.delete("/api/notes/:id", function (req,res) {
    
// });


// Listener
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
})