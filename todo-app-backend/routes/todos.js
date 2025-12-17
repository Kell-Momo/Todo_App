const express = require('express');
const router = express.Router();
const Task = require('../models/todo');
const CreateTodoDto = require('../dto/create-todo.dto');
const UpdateTodoDto = require('../dto/update-todo.dto');
const {
  validateCreateTodo,
  validateUpdateTodo,
  validateObjectId
} = require('../middleware/validation.middleware');
const Todo = require('../models/todo');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const { completed, priority, sortBy } = req.query;
    
    // Build filter
    const filter = {};
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    if (priority) {
      filter.priority = priority;
    }

    // Build sort
    let sort = { created_at: -1 }; // Default: newest first
    if (sortBy === 'dueDate') {
      sort = { dueDate: 1 };
    } else if (sortBy === 'priority') {
      sort = { priority: 1 };
    }

    const tasks = await Task.find(filter).sort(sort);
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching tasks', 
      error: error.message 
    });
  }
});

// GET single task by ID
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching task', 
      error: error.message 
    });
  }
});

// POST create new task
router.post('/', validateCreateTodo, async (req, res) => {
  try {
    // Use DTO to sanitize and format data
    const createTodoDto = new CreateTodoDto(req.body);
    
    // Create task from DTO
    const task = new Task(createTodoDto.toObject());
    const savedTask = await task.save();
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: savedTask
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ 
      success: false,
      message: 'Error creating task', 
      error: error.message 
    });
  }
});

// PUT update task
router.put('/:id', validateObjectId, validateUpdateTodo, async (req, res) => {
  try {
    // Check if task exists
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }

    // Use DTO to sanitize and format update data
    const updateTodoDto = new UpdateTodoDto(req.body);
    
    if (!updateTodoDto.hasUpdates()) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    // Update task
    const updatedTask = await Todo.findByIdAndUpdate(
      req.params.id,
      updateTodoDto.toObject(),
      { 
        new: true,           // Return updated document
        runValidators: true  // Run model validators
      }
    );

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ 
      success: false,
      message: 'Error updating task', 
      error: error.message 
    });
  }
});

// PATCH toggle completion status
router.patch('/:id/toggle', validateObjectId, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }

    task.completed = !task.completed;
    const updatedTask = await task.save();

    res.json({
      success: true,
      message: `Task marked as ${updatedTask.completed ? 'completed' : 'incomplete'}`,
      data: updatedTask
    });
  } catch (error) {
    console.error('Error toggling task:', error);
    res.status(400).json({ 
      success: false,
      message: 'Error toggling task completion', 
      error: error.message 
    });
  }
});

// DELETE task
router.delete('/:id', validateObjectId, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Task deleted successfully',
      data: task
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting task', 
      error: error.message 
    });
  }
});

module.exports = router;