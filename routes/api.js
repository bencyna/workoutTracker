const router = require("express").Router();
const Workout = require("../models/Workout.js");
const path = require("path");

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
  Workout.create(body).then((dbWorkout) => {
    res.json(dbWorkout);
  });
  // .catch((err) => {
  //   res.status(400).json(err);
  // });
});

router.get("/api/workouts/range", (req, res) => {
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

// router.put("/api/workouts/:id", (req, res) => {
//   Workout.update(req.params.id, body, { body });
// });

module.exports = router;
