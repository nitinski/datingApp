// Load the express module (Where do you think this comes from?)
var express = require("express");
var app = express();

var path = require("path");

// require body-parser
var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); 

require('./server/config/mongoose.js');

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(path.join(__dirname, "./client/static")));
// try printing out __dirname using console.log to see what it is and why we use it

// This sets the location where express will look for the ejs views
// app.set('views', path.join(__dirname, './client/views'));
// // Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
// app.set('view engine', 'ejs');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

// Tell the express app to listen on port 8000
var server = app.listen(8080, function() {
  console.log("listening on port 8080");
});
// this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)

