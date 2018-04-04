const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require('passport');
const flash=require("connect-flash");

// const routes = require("./routes/articles");
const PORT = process.env.PORT || 3001;
const app = express();

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// pass the passport middleware
app.use(passport.initialize());

//project init:jasons group
//requirements for express app to use passport
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'LettuceEat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./routes/apiRoutes")(app);

//app.use('/api', apiRoutes);
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log(`🌎 ==> Server now on port ${PORT}!`);
    });
});