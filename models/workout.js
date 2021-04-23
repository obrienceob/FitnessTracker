const mongoose = require("mongoose");
const Exercise = require("./Exercise");
//creating the date for the workout to separate responsibilities of the files, dependent on exercise model
const workoutSchema = new mongoose.Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [Exercise.schema]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;