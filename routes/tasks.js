const router = require('express').Router();
const Task = require("../models/Task");

router.get('/tasks', async (req, res) => {
    
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(err){
        res.json({message: err});
    }
});

router.post('/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title
    });

    try{
        const savedTask = await task.save();
        res.json(savedTask);
    }catch(err) {
        res.json({message: err});
    }
});

router.delete("/task/:id", async (req, res) => {
    try{
        const removedTask = await Task.deleteOne({_id: req.params.id});
        res.json(removedTask);
    } catch(err){
        res.json({message: err});
    }
    
});

router.put("/task/:id", async (req, res) => {
    try{
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body);
        res.json(updatedTask);

    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;