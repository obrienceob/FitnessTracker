const db = require('../models');
const router = require('express').Router();
//ref activity 14

// get all  workoutes -GET
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(allWorkouts => {
            //console.log("---------all workouts------------");
            //console.log(allWorkouts);
            res.json(allWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
});

// get all workouts in range -GET
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        //should limit the range to 7 workouts
        .limit(7)
        .then(workoutsRange => {
            //console.log("------workouts in range-------");
            //console.log(workoutsRange);
            res.json(workoutsRange);
        })
        .catch(err => {
            res.json(err);
        });
});

// create new workut -POST
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(workout => {
            //console.log("--------new workout---------");
            //console.log(workout);
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
});

// add exercise to a workout -PUT
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },

            // see code commented-out at end of page for attempts using aggregate, addfields, sum, and other methods.
            // discovered $inc instead of $set, which worked

            // ref: https://www.w3resource.com/mongodb/mongodb-field-update-operator-$inc.php
            //{ $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
        { $inc: { totalDuration: req.body.duration }, $push: { exercises: req.body } },
        { new: true }
    )    
    .then(workout => {
        //console.log("---------edited workout----------");
        //console.log(workout);
        res.json(workout);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;


            // Attempt to use aggregate and and $add
            // .aggregate(
            //     // Limit to relevant documents and potentially take advantage of an index
            //     { $match: {
            //         _id: req.params.id
            //     }},
            
            //     { $project: {
            //         _id: req.params.id,
            //         totalDuration: { $add: ["$duration"] }
            //     }}
            // )
            // example
            //aggregate.addFields({ salary_k: { $divide: [ "$salary", 1000 ] } });


            //Attempts to use set
            // [
            //     {"$set": {"totalDuration": { "$add": ["$res.totalDuration", "$req.body.duration"]}}}
            // ],
            //$set: {
                 //"totalDuration": totalDuration += req.body.duration,
            //},


            // Attempt to use a function withing the findOneAndUpdate
            // // 1: FIND the record
            // User.findOne(
            //     {email : 'simon@theholmesoffice.com'},
            //     function(err, user) {
            //       if(!err){
            //         // 2: EDIT the record
            //         user.name = "Simon";
            //         // 3: SAVE the record
            //         user.save(function(err,user){
            //           console.log('User saved:', user);
            //         });
            //       }
            //     };
            //   );


            // Attempt at function within call
            // router.put("/api/workouts/:id", (req, res) => {
            //     db.Workout.findOneAndUpdate(
            //         { _id: req.params.id },
            //         { $push: { exercises: req.body } },
            //         function(err, workout) {
            //             if(err) {
            //                 res.json(err);
            //                 console.log(err);
            //             } else {
            //                 workout.totalDuration = 0;
            //                 workout.exercises.forEach(object => {
            //                     workout.totalDuration += Number(object.duration)
            //                 });
            //                 return Number(workout.totalDuartion);
            //             }
            //         },
            //         { new: true }
            //     )
            //     .then(workout => {
            //         console.log("---------edited workout----------");
            //         console.log(workout);
            //         res.json(workout);
            //     })
            //     .catch(err => {
            //         res.json(err);
            //     });
            // });


            // Attempt to use helper functions (goes in model)
            // WorkoutsSchema.methods.getTotalDuration = async function() {
            //     this.totalDuration = 0;
            //     this.exercises.forEach(element => {
            //       this.totalDuration += Number(element.duration)
            //     });
            //     return Number(this.totalDuration);
            //   }