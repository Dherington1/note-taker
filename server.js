const { request } = require("express");
const express = require ("express");

// declares which port were using 
const PORT = process.env.PORT || 3001;
// need to run express
const app = express();

// connect our files to here so they can be ran
const apiRoutes = require("./Routes/apiroutes")
const htmlRoutes = require("./Routes/htmlroutes")


app.use(express.urlencoded({extended: true}));

// takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object
app.use(express.json());

// used express.static and pointed it to our front end folder
// attaches our styles and js
app.use(express.static("public"));


// anytime the user goes to the route /api it will use the files in apiroutes
app.use("/api", apiRoutes);
// anytime the user ends with / then it goes to homepage 
app.use("/", htmlRoutes);


// listens for our server pushes
app.listen (PORT, () => {
    console.log (`App listening on PORT ${PORT}`);
});

// npm install 
// npm install express -- save