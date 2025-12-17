const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },

    description: {
      type: String,
      required: [true, 'Task description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },

    completed: {
      type: Boolean,
      default: false
    },

    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: '{VALUE} is not a valid priority'
      },
      default: 'medium',
      lowercase: true
    },

    dueDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);


// Export the model
module.exports = mongoose.model('Todo', todoSchema);