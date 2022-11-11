const express = require('express');
const morgan = require('morgan');
const boardRouter = require('./routes/boardRouter');
const errorHandler = require('./utils/errorHandler');
const AppError = require('./utils/appError');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/boards', boardRouter);

app.use('*', (req, res, next) => {
  next(new AppError('Could not find the route of given name', 404));
});
app.use(errorHandler);

module.exports = app;
