const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');

const config = require('./config');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// connect to MongoDB server
mongoose.connect(config.db.uri);

// make app
const app = express();

// use request logger
app.use(requestLogger);

// use cookie parser
app.use(cookieParser());

// use cors
app.use(cors);

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
