const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const config = require('./config');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// connect mongo, study-tests wants db string uri here :(
// mongoose.connect(config.db.uri);
mongoose.connect('mongodb://localhost:27017/mestodb');

// make app
const app = express();

// use request logger
app.use(requestLogger);

// use cookie parser
app.use(cookieParser());

// use routes
app.use('/', routes);

// use error logger
app.use(errorLogger);

// input validation error handler (celebrate, joi)
app.use(errors());

// main error handler
app.use(errorHandler);

// listen connections
app.listen(config.app.port);
