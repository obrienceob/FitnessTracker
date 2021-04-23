const mongoose = require("mongoose");
const Exercise = require("./Exercise");

const workoutSchema = new mongoose.Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [Exercise.schema]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;