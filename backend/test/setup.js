const dotenv = require('dotenv');
const path = require('path');

// Load test environment variables
dotenv.config({
  path: path.join(__dirname, '../.env.test')
});

// Set default test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret_key';
process.env.JWT_MAX_AGE = '3600000';

// Set default test environment variables if not provided
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_db';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';
process.env.JWT_MAX_AGE = process.env.JWT_MAX_AGE || '3600000';