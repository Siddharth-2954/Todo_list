// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const TodoModel = require('./Models/Todo');

// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test');

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await TodoModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/add', async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  try {
    const newTask = await TodoModel.create({ task });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await TodoModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is Running");
});
