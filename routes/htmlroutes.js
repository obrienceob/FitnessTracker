// ref activity 7. moved to routes from server.js
const router = require('express').Router();
const path = require('path');

// homepage: get '/', /index.html 
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../../public/index.html"));
});

// exercise page: get '/exercise', /exercise.html
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "../../public/exercise.html"));
});

// stats page: get '/stats', /stats.html
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "../../public/stats.html"));
});

module.exports = router;