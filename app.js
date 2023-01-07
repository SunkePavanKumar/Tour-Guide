const express = require('express');

const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const DB = process.env.DATABASE;

const tourRouter = require('./Routes/tourRoutes');
const UserRouter = require('./Routes/tourUsers');

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(morgan('dev'));
mongoose.set('strictQuery', true);
mongoose.connect(DB).then(() => {
  // console.log(con.connection);
  console.log("'connnected to the database Successfully");
});
// eslint-disable-next-line no-unused-vars

app.use((req, res, next) => {
  console.log('Hello from middlewre side!');
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toUTCString;
  next();
});

app.use(express.static('c:/starter/public'));
app.use('/app/v1/users', UserRouter);
app.use('/app/v1/tours', tourRouter);

// route handler for the req of the user for the invalid routes

app.all('*', (req, res, next) => {
  // const err = new Error(
  //   `cannot find the route ${req.originalUrl} on this server,Please enter the correct url`
  // );
  // err.status = 'Fail';
  // err.statusCode = 400;
  next(
    // eslint-disable-next-line new-cap
    new appError(
      `cannot find the route ${req.originalUrl} on this server,Please enter the correct url`,
      404
    )
  );
  // res.status(404).json({
  //   status: 'fail',
  //   message: `cannot find the route ${req.originalUrl} on this server,Please enter the correct url`,
  // });
});
app.use(globalErrorHandler);

module.exports = app;
