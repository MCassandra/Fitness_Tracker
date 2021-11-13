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

// app.get("/all", (req, res) => {
//   db.exercises.find({}, (err, found) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(found);
//     }
//   });
// });

// get to exercises
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
  //   db.exercises.find().sort({ name: 1 }, (err, found) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.json(found);
  //     }
  //   });
});

// get stats
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
  // db.exercises.find().sort({ weight: -1 }, (err, found) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.json(found);
  //   }
  // });
});

// api routes
// create a workout 
app.post("/api/workouts/:id", (req, res) => {
  Workout.create({ _id: req.params.id }, {
    $push: { exercises: req.body }
  })
    .then(dbWorkout => {
      res.json(dbWorkout)
    }).catch(err => res.json(err))
});

// update a workout 
app.put("/api/workouts/:id", (req, res) => {
  Workout.updateOne({ _id: req.params.id }, {
    $push: { exercises: req.body }
  })
    .then(dbWorkout => {
      res.json(dbWorkout)
    }).catch(err => res.json(err))
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
