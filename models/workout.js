const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: String,
        name: { type: String, trim: true, required: "Enter a name for your workout" },
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
      }
    ]
  }
);


const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;


