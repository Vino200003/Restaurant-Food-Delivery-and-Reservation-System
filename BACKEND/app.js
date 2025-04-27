const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const path = require('path');
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
const subCategoryRoutes = require('./routes/subCategoryRoutes');

const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Serve static files from the frontend's public directory
app.use('/images', express.static(path.join(__dirname, '../FRONTEND/public')));

// Routes with proper namespacing
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/category', categoryRoutes); // Changed from categories to category
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderItemRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/subcategories', subCategoryRoutes);

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