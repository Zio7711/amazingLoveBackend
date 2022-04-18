import connectDB from './db/connect.js';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import express from 'express';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';

const app = express();

dotenv.config();

//middleware

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to mongoDB');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
