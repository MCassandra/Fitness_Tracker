// api routes


// create a workout 
// app.post("/api/workouts", ({ body }, res) => {
//   Workout.create(body)
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// create a new workout
app.post("/api/workouts", async (req, res) => {
    try{
      const response = await Workout.create({type: "workout"})
      res.json(response);
    }
    catch (err){
      console.log("cannot create workout", err)
    }
  })
  
  
//   add exercise
  app.put("/api/workouts/:id", ({ body, params }, res) => {
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