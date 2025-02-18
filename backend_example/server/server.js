const express = require('express');
const connectDB = require('./context/serverConection');
const cors = require('cors'); // Añade esta línea
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Añade esta línea
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/comments', require('./routes/comments'));

// Home route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Serve static files
app.use(express.static('public'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
