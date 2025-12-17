require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.use('/api/tasks', todoRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo API Server Running',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start server
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
      console.log(`API endpoints available at http://localhost:${PORT}/api/tasks`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});