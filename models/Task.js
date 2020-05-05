const mongoose = require('mongoose');

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
        default: Date.now()
    }
});

module.exports = mongoose.model('tasks', taskSchema );