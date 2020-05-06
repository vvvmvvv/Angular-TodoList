const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log("Database connected!")
);

app.use(cors());

app.use(express.json());

//app.use('/api', tasks);
app.use(express.urlencoded({ extended: true }))

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    isChecked: {
        type: Boolean,
        default: false
    },
    dates: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('tasks', taskSchema );

app.get('/api/tasks', async (req, res) => {
    
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(err){
        res.json({message: err});
    }
});

app.post('/api/tasks', async (req, res) => {
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

app.delete("/api/task/:id", async (req, res) => {
    try{
        const removedTask = await Task.deleteOne({_id: req.params.id});
        res.json(removedTask);
    } catch(err){
        res.json({message: err});
    }
    
});

app.put("/api/task/:id", async (req, res) => {
    try{
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body);
        res.json(updatedTask);

    }catch(err){
        res.json({message: err});
    }
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });


app.listen(process.env.PORT || 8080, ()=>{
    console.log("Server start!")
});