const mongoose = require("mongoose");
//defining exercise fields
const exerciseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number
    },
    weight: {
        type: Number
    },
    sets: {
        type: Number
    },
    reps: {
        type: Number
    },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;