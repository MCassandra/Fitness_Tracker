const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day:{
    type: Date,
    default: ()=> new Date(),
  },
  Exercises: [{
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    trim: true,
    required: "Enter a name for your workout"
  },
  value: {
    type: Number,
    required: "Enter an amount"
  },
  date: {
    type: Date,
    default: Date.now
  }
]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
