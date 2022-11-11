const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const boardRouter = require('./routes/boardRouter');
const errorHandler = require('./utils/errorHandler');
const AppError = require('./utils/appError');

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/boards', boardRouter);

app.use('*', (req, res, next) => {
  next(new AppError('Could not find the route of given name', 404));
});
app.use(errorHandler);

module.exports = app;
