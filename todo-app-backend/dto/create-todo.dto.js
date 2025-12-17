class CreateTodoDto {
  constructor(data) {
    this.title = data.title?.trim();
    this.description = data.description?.trim();
    this.completed = data.completed !== undefined ? Boolean(data.completed) : false;
    this.priority = data.priority || 'medium';
    this.dueDate = data.dueDate ? new Date(data.dueDate) : null;
  }

  // Convert DTO to plain object for database insertion
  toObject() {
    return {
      title: this.title,
      description: this.description,
      completed: this.completed,
      priority: this.priority,
      dueDate: this.dueDate
    };
  }

  // Validate the DTO
  isValid() {
    return (
      this.title &&
      this.title.length >= 3 &&
      this.description &&
      ['low', 'medium', 'high'].includes(this.priority)
    );
  }
}

module.exports = CreateTodoDto;