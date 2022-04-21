import 'express-async-errors';

import {
  socketOnConnection,
  socketOnDisconnection,
} from './websocket/initializeSocket.js';

import { Server } from 'socket.io';
import authRouter from './routes/authRoutes.js';
import authenticateUser from './middleware/auth.js';
import connectDB from './db/connect.js';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import express from 'express';
import http from 'http';
import messageRouter from './routes/messageRoutes.js';
import morgan from 'morgan';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import userRouter from './routes/userRoutes.js';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

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
app.use('/api/v1/user', authenticateUser, userRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to mongoDB');

    server.listen(port, '0.0.0.0', () => {
      console.log(`Server started on port ${port}...`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();

// socket.io functions

socketOnConnection(io);
socketOnDisconnection(io);
