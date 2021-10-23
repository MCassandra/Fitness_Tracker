const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: Date,
  Exercises:[ {
    type: String,
    name: {type:String, trim:true},
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    required: "Enter a name for your workout"
  },
]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
