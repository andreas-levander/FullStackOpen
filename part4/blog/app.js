import express from 'express';
import eae from 'express-async-errors';
import cors from 'cors';
import mongoose from 'mongoose';
import * as logger from './utils/logger.js';
import blogRouter from './controllers/blogs.js';
import usersRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import { MONGODB_URI } from './utils/config.js';
import { errorHandler, tokenExtractor } from './utils/middleware.js';

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
app.use(tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);

export default app;