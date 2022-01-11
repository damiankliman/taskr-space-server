const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config()
const port = 3001;

const TaskModel = require('./models/tasks');

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@taskr-cluster-0.tkthr.mongodb.net/task?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
    console.log('Connected to database');
})

const task = new TaskModel({ taskTitle: 'test 10', taskInfo: 'test info for the third task', complete: true, owner: 'testUser' });

// task.save( (err, task) => {
//     if (err) return console.error(err);
//     console.log('Task inserted successfully');
// });

app.get("/read", async (req, res) => {
    TaskModel.find({ owner: 'testUser' }, (err, result) => {
        if (err) {res.send(err)};
        res.send(result);
        console.log('sent data to client');
    });
});

app.delete("/delete", async (req, res) => {
    TaskModel.deleteOne({ _id: `${req.body._id}` }, (err) => {
        if (err) {console.log(err)};
        console.log(`Successful deleted task with id: ${req.body._id}`);
    });
});

app.put("/complete/:id", async (req, res) => {
    const {id: _id} = req.params.id
    TaskModel.updateOne({ _id: req.params.id }, { $set: { complete: req.body.complete } }, (err, result) => {
        if (err) {console.log(err)};
        res.send(result);
        console.log(`Updated completion with ${req.body.complete}`);
    });
});


app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`);
});