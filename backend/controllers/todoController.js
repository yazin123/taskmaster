const Todo = require('../models/todo');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get a single todo
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid todo ID'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create a todo
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid todo ID'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid todo ID'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};