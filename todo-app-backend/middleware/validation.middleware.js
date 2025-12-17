const { 
  createTodoSchema, 
  updateTodoSchema, 
  objectIdSchema 
} = require('../schema/todo.schema');

// Generic validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true  // Remove unknown fields
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};

// Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params.id);

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID format',
      error: error.details[0].message
    });
  }

  next();
};

// Specific validators for task routes
const validateCreateTodo = validate(createTodoSchema);
const validateUpdateTodo = validate(updateTodoSchema);

module.exports = {
  validate,
  validateObjectId,
  validateCreateTodo,
  validateUpdateTodo
};