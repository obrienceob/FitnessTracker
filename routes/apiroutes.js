const router = require("express").Router();
const db = require("../models");
//aggregating workouts duration using $addfields on the mongo db
router.get("/workouts", async (req, res) => {
    try {
        const workouts = await db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }]);
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json(err);
    }
});
//
router.get("/workouts/range", async (req, res) => {
    try {
        const workoutRange = await db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }]).sort({ _id: -1 }).limit(7);
        res.status(200).json(workoutRange);
    } catch (err) {
        res.status(500).json(err);
    }
})
//posting a new workout
router.post("/workouts", async (req, res) => {
    try {
        const newWorkout = await db.Workout.create({});
        console.log(newWorkout)
        res.json(newWorkout);
    } catch (err) {
        console.error(err);
    }
});
//editing a workout
router.put("/workouts/:id", async (req, res) => {
    try {
        const updatedWorkout = await db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true });
        res.json(updatedWorkout);
    } catch (err) {
        res.status(400).json(err);
    }
})


module.exports = router;