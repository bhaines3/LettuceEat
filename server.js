const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/apiRoutes");
const session = require("express-session");
const passport = require("./config/passport");

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

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "polkadotted elephant", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/", apiRoutes);
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
module.exports = db.sequelize.sync().then(function () {
    return app.listen(PORT, function () {
        console.log("🌎 ==> Server now on port ${PORT}!");
    });
});
