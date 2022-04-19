import 'express-async-errors';

import authRouter from './routes/authRoutes.js';
import authenticateUser from './middleware/auth.js';
import connectDB from './db/connect.js';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import express from 'express';
import messageRouter from './routes/messageRoutes.js';
import morgan from 'morgan';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';

const app = express();

dotenv.config();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

// routers
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/message', authenticateUser, messageRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to mongoDB');

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server started on port ${port}...`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
