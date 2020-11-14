const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// Middleware for assets

//Need API routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);


app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
})