const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const staffRoutes = require('./routes/staffRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const tableRoutes = require('./routes/tableRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', staffRoutes);
app.use('/api', reservationRoutes);
app.use('/api', tableRoutes);
app.use('/api', categoryRoutes);
app.use('/api', menuRoutes);
app.use('/api', orderItemRoutes);
app.use('/api', paymentRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', supplierRoutes);


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;