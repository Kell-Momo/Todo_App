const Joi = require('joi');

// Schema for creating a new task
const createTodoSchema = Joi.object({
  title: Joi.string()
    .max(255)
    .required()
    .trim()
    .messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'string.max': 'Title cannot exceed 255 characters',
      'any.required': 'Title is required'
    }),

  description: Joi.string()
    .min(1)
    .max(500)
    .required()
    .trim()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.max': 'Description cannot exceed 500 characters',
      'any.required': 'Description is required'
    }),

  completed: Joi.boolean()
    .default(false)
    .messages({
      'boolean.base': 'Completed must be a boolean value'
    }),

  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .default('medium')
    .messages({
      'string.base': 'Priority must be a string',
      'any.only': 'Priority must be one of: low, medium, high'
    }),

  dueDate: Joi.date()
    .iso()
    .allow(null)
    .optional()
    .messages({
      'date.base': 'Due date must be a valid date',
      'date.format': 'Due date must be in ISO format'
    })
});

// Schema for updating a task
const updateTodoSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100)
    .trim()
    .messages({
      'string.base': 'Title must be a string',
      'string.max': 'Title cannot exceed 100 characters'
    }),

  description: Joi.string()
    .min(1)
    .max(500)
    .trim()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 500 characters'
    }),

  completed: Joi.boolean()
    .messages({
      'boolean.base': 'Completed must be a boolean value'
    }),

  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .messages({
      'string.base': 'Priority must be a string',
      'any.only': 'Priority must be one of: low, medium, high'
    }),

  dueDate: Joi.date()
    .iso()
    .allow(null)
    .messages({
      'date.base': 'Due date must be a valid date',
      'date.format': 'Due date must be in ISO format'
    })
}).min(1); // At least one field must be provided for update

// Schema for validating MongoDB ObjectId
const objectIdSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.pattern.base': 'Invalid task ID format'
  });

module.exports = {
  createTodoSchema,
  updateTodoSchema,
  objectIdSchema
};