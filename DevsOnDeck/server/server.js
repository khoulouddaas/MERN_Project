// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173',  // your React frontend URL
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB and start server only after successful connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    // Import your routes here after DB connection is ready
    require('./routes/developer.routes')(app);

    // Start Express server
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server listening on port ${process.env.PORT || 8000}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });
