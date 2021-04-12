const router = require("express").Router();
const Workout = require("../models/Workout.js");
const path = require("path");
const mongojs = require("mongojs");

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/api/workouts", (req, res) => {
  Workout.find({}).then((dbWorkout) => {
    res.json(dbWorkout);
    // .catch((err) => {
    //   res.json(err);
    // });
  });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.insert(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      // res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  // const hey = Workout.find({});
  // console.log(hey);
  Workout.find({})
    // .sort({ workoutCreated })
    // figure this out !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    .then((dbWorkout) => {
      res.json(dbWorkout);
    });
  // .catch((err) => {
  //   res.status(400).json(err);
  // });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  Workout.updateOne(
    {
      _id: mongojs.ObjectId(req.params.id),
    },
    {
      $set: {
        type: req.body.type,
        name: req.body.name,
        weight: req.body.weight,
        sets: req.body.sets,
        reps: req.body.reps,
        duration: req.body.duration,
        distance: req.body.distance,
      },
    },
    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

module.exports = router;
