import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);

  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong',
  };

  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.message = err.message;
    defaultError.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(',');
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.CONFLICT;
    defaultError.message = `${Object.keys(err.keyValue)[0]} already exists`;
  }
  res.status(defaultError.statusCode).json({
    status: 'error',
    message: defaultError.message,
  });
};
export default errorHandlerMiddleware;
