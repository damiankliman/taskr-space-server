const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
    },
    taskInfo: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    }
});

const task = mongoose.model('tasks', TaskSchema);
module.exports = task;