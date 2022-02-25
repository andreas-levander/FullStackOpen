const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blog');
const config = require('./utils/config');

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
    })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

module.exports = app;