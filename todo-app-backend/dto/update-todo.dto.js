class UpdateTodoDto {
  constructor(data) {
    // Only include fields that are actually being updated
    if (data.title !== undefined) {
      this.title = data.title.trim();
    }
    
    if (data.description !== undefined) {
      this.description = data.description.trim();
    }
    
    if (data.completed !== undefined) {
      this.completed = Boolean(data.completed);
    }
    
    if (data.priority !== undefined) {
      this.priority = data.priority;
    }
    
    if (data.dueDate !== undefined) {
      this.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    }
  }

  // Convert DTO to plain object for database update
  toObject() {
    const updateData = {};
    
    if (this.title !== undefined) updateData.title = this.title;
    if (this.description !== undefined) updateData.description = this.description;
    if (this.completed !== undefined) updateData.completed = this.completed;
    if (this.priority !== undefined) updateData.priority = this.priority;
    if (this.dueDate !== undefined) updateData.dueDate = this.dueDate;
    
    return updateData;
  }

  // Check if there are any fields to update
  hasUpdates() {
    return Object.keys(this.toObject()).length > 0;
  }

  // Validate priority if provided
  isValid() {
    if (this.priority !== undefined) {
      return ['low', 'medium', 'high'].includes(this.priority);
    }
    return true;
  }
}

module.exports = UpdateTodoDto;