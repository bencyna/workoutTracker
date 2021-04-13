const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      name: {
        type: String,
        required: "Name this Exercise",
      },
      type: {
        type: String,
        required: "What type of workout is this?",
      },
      weight: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      duration: {
        type: Number,
        required: "Add how long this workout took",
      },
      distance: {
        type: Number,
      },

      totalDuration: {
        Type: Number,
      },

      workoutType: {
        type: String,
      },
    },
  ],
});

workoutSchema.methods.setCardio = function () {
  this.cardio = true;
  return this.cardio;
};

workoutSchema.methods.setAnaerobic = function () {
  this.cardio = false;
  return this.cardio;
};

workoutSchema.methods.lastUpdatedDate = function () {
  this.lastUpdated = Date.now();

  return this.lastUpdated;
};

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
