const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register a user
exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, phone_number, address, city, password } = req.body;

  const query = 'SELECT * FROM Users WHERE email = ? OR phone_number = ?';

  db.query(query, [email, phone_number], (err, results) => {
    if (err) {
      console.error('Database query error:', err);  // Log the database query error
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email or Phone number already in use' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Password hashing error:', err);  // Log the password hashing error
        return res.status(500).json({ message: 'Password hashing error', error: err.message });
      }

      const insertQuery = 'INSERT INTO Users (first_name, last_name, email, phone_number, address, city, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(insertQuery, [first_name, last_name, email, phone_number, address, city, hashedPassword], (err, results) => {
        if (err) {
          console.error('Database insert error:', err);  // Log the insert error
          return res.status(500).json({ message: 'Error inserting data into database', error: err.message });
        }

        res.status(201).json({
          message: 'User registered successfully',
          user_id: results.insertId
        });
      });
    });
  });
};



// Login User
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const query = 'SELECT * FROM Users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    // Compare passwords
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Password comparison error' });
      }
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.user_id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token
      });
    });
  });
};




// GET /users/{user_id}
exports.getUserProfile = (req, res) => {
  const { user_id } = req.params;

  const query = 'SELECT * FROM Users WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = results[0];
    res.status(200).json({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
      city: user.city
    });
  });
};



// PUT /users/{user_id}
exports.updateuserProfile = (req, res) => {
  const { user_id } = req.params;
  const updates = req.body;

  // Build the query dynamically
  const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
  const values = Object.values(updates);
  values.push(user_id);

  const query = `UPDATE Users SET ${fields} WHERE user_id = ?`;
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User profile updated successfully' });
  });
};


/*
//Get all users
exports.getAllUsers = (req, res) => {
  const query = 'SELECT user_id, first_name, last_name, email, phone_number, address, city FROM Users';

  db.query(query, (err, results) => {
    if(err) {
      console.error ('Database query error:', err);
      return res.status(500).json({ message: 'Database Error', error: err.messgae});
    }

    res.status(200).json({results});
  });
};
*/


