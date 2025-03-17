const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/');
    logger.info('connected to db ');
  } catch (e) {
    logger.error('connection failed', e.message);
  }
};

module.exports = connectDB;
