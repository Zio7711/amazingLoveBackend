require('express-async-errors');

const { Server } = require('socket.io');
const connectDB = require('./db/connect.js');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const express = require('express');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware.js');
const morgan = require('morgan');
const notFoundMiddleware = require('./middleware/notFoundMiddleware.js');

// const messageRouter = require('./routes/messageRoutes.js');
// const { socketOnConnection } = require('./websocket/initializeSocket.js');
// const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/authRoutes.js');
// const authenticateUser = require('./middleware/auth.js');

// const bucketListItemRouter = require('./routes/bucketListRoutes.js');

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  },
});

module.exports = {
  io,
};

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
// app.use('/api/v1/message', authenticateUser, messageRouter);
// app.use('/api/v1/user', authenticateUser, userRouter);
// app.use('/api/v1/bucketList', authenticateUser, bucketListItemRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.POSTGRES_URI);
    // console.log('Connected to Postgres');

    server.listen(port, '0.0.0.0', () => {
      console.log(`Server started on port ${port}...`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();

// socketOnConnection(io);
