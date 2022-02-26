import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as logger from './utils/logger.js';
import blogRouter from './controllers/blogs.js';
import { MONGODB_URI } from './utils/config.js';

const app = express();

logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
    })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

export default app;