const router = require('express').Router();
var path = require('path');
//homepage route
router.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (err) {
        res.status(500).json(err);
    }
});
//adding an exercise route
router.get("/exercise", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/exercise.html'));
    } catch (err) {
        res.status(500).json(err);
    }
});
//stats page route
router.get("/stats", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/stats.html'));
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router