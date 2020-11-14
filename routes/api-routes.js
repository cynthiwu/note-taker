const fs = require("fs");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        fs.readFile("../db/db.json", function (err, data) {
            if (err) throw err;
            const dataObj = JSON.parse(data);
            console.log(dataObj);
            res.json(dataObj);
        });
    });

    // Post
    app.post("/api/notes", function(req, res) {
        fs.writeFile("..")
    })
    
    // Delete

}