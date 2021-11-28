const router = require("express").Router();
const db = require("../models");


// create a new workout
router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then((dbWorkouts) => {
        res.json(dbWorkouts);
    }).catch(err => {
        res.status(400).json(err);
    });
});

// update the workout body by creating an exercise
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
        req.params.id,
        {
            $push: { exercises: req.body }
        })
        .then((dbWorkouts) => {
            console.log(dbWorkouts)
            res.json(dbWorkouts);
        }).catch(err => {
            res.json(err);
        });
});




// get workout range
// router.get("/api/workouts/range", (req, res) => {
//     console.log("/api/workouts/range 1");
//     db.Workout.find({})
//         .then(dbWorkouts => {
//             res.json(dbWorkouts);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// get last workout
// router.get("/api/workouts", (req, res) => {
//     // console.log("/api/workouts 1");
//     db.Workout.find({})
//         .then(dbWorkouts => {
//             // console.log(dbWorkouts)
//             res.json(dbWorkouts);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// });


// get total duration of each workout from past 7 workouts on stats page
router.get("/api/workouts", (req, res) => {
    // console.log("/api/workouts 2");
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                }
            }
        }
    ])
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    // console.log("/api/workouts/range 2");
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                }
            }
        }
    ])
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router
