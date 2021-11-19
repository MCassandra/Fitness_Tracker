const router = require("express").Router();
var db = require("../models");


// create a new workout
router.post("/api/workouts", async (req, res) => {
    try {
        const response = await db.Workout.create({ type: "workout" })
        res.json(response);
    }
    catch (err) {
        console.log("eroor creating yourworkout", err)
    }
})


//   add exercise to workout
//   router.put("/api/workouts/:id", ({ body, params }, res) => {
//     Workout.insertMany(body)
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.status(400).json(err);
//       });
//   });


router.put("/api/workouts/:id", ({ body, params }, res) => {
    // console.log(body, params)
    const workoutId = params.id;
    let savedExercises = [];

    // gets all the currently saved exercises in the current workout
    db.Workout.find({ _id: workoutId })
        .then(dbWorkout => {
            console.log(dbWorkout)
            savedExercises = dbWorkout[0].exercises;
            res.json(dbWorkout[0].exercises);
            let allExercises = [...savedExercises, body]
            console.log(allExercises)
            updateWorkout(allExercises)
        })
        .catch(err => {
            res.json(err);
        });

})

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
});

// get last workout
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(Workout => {
            res.json(Workout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


// add an exercise to most recent exercise

// get combined weight of multiple exercises from past 7 workouts on stats page

// get total duration of each workout from past 7 workouts on stats page

module.exports = router;