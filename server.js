const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const mongojs = require("mongojs");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["exercises"];



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// home routes routes
// db.on("error", error => {
//   console.log("Database Error:", error);
// });


// go to home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


// get exercises
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));

});

// get stats
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));

});

require("./routes/apiRoutes")(app);



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
