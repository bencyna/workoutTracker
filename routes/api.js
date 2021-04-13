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
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort([["day", 1]])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findById(req.params.id)
    .then((workout) => {
      console.log(workout);
      workout.exercises.push(req.body);
      Workout.updateOne({ _id: req.params.id }, workout, (err, result) => {
        res.json(workout);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
