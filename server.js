const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "fitnesstracker";
const collections = ["exercises"];

const db = mongojs(databaseUrl, collections);



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstracker", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
db.on("error", error => {
    console.log("Database Error:", error);
  });

app.get("/", (req, res) =>{
    res
})
  
  app.get("/", (req, res) => {
    res.send("Hello world");
  });
  
  app.get("/all", (req, res) => {
    db.exercises.find({}, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  });
  
  app.get("/name", (req, res) => {
    db.exercises.find().sort({ name: 1 }, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  });
  
  app.get("/weight", (req, res) => {
    db.exercises.find().sort({ weight: -1 }, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});