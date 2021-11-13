const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const mongojs = require("mongojs");
const path = require("path");
const Workout = require("./models/workout")

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["exercises"];

const db = mongojs(databaseUrl, collections);



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
db.on("error", error => {
  console.log("Database Error:", error);
});


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

// api routes


// create a workout 
app.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// add exercise
app.put("/api/workouts/:id", ({ body }, res) => {
  Workout.insertMany(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// get last workout
app.get("/api/workouts", (req, res) =>{
  Workout.find({})
    .sort({ _id: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// add an exercise to most recent exercise

// get combined weight of multiple exercises from past 7 workouts on stats page

// get total duration of each workout from past 7 workouts on stats page




app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
