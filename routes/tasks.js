const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

const db = mongojs(
    'meantask',
    ['tasks']
)

router.get('/tasks', (req, res, next) => {
    db.tasks.find((err, tasks) => {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    })
})

router.post("/tasks", (req, res, next) => {
    const task = req.body;
    console.log(task);
    if (!task.title) {
        res.status(400).json({ error: "Bad Data" });
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) {
                res.send(err);
            }
            res.json(task);
        })
    }
});

router.delete('/task/:id', (req, res) => {
    db.tasks.remove({ _id: mongojs.ObjectID(req.params.id) }, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    })
});

router.put('/task/:id', (req, res) => {
    const task = req.body;
    const updTask = {};

    if (task.title) {
        updTask.title = task.title;
    }

    if (!updTask) {
        res.status(400).json({ error: "Bad Data" });
    } else {
        db.tasks.update(
            { _id: mongojs.ObjectID(req.params.id)},
            updTask,
            {},
            (err, task) => {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            }
        )
    }

});

module.exports = router;