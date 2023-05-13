const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Import routes
const maingroupRoutes = require('./routes/maingroup');
const subgroupRoutes = require('./routes/subgroup');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Use routes
app.use('/maingroup', maingroupRoutes);
app.use('/subgroup', subgroupRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
