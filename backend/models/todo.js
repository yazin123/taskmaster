const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      validate: {
        validator: function(value) {
          return value.length > 0;
        },
        message: 'Title cannot be empty'
      }
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    }
  },
  {
    timestamps: true // This will automatically add createdAt and updatedAt fields
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;