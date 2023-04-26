const mongoose = require('mongoose');
const { constants } = require('http2');
const {
  NullQueryResultError,
  CredentialsError,
  AuthenticationRequiredError,
  ForbiddenError,
  UrlNotFoundError,
} = require('../errors/castomErrors');

function errorHandler(err, req, res, next) {
  if (err.code === 11000) { // MongoServerError
    res
      .status(constants.HTTP_STATUS_CONFLICT)
      .send({ message: 'Объект с предоставленными данными уже существует.' });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
      message: 'Переданы некорректные данные полей объекта.',
    });
    return;
  }
  if (err instanceof mongoose.Error.CastError && err.path === 'owner') {
    res
      .status(constants.HTTP_STATUS_FORBIDDEN)
      .send({ message: 'Неверный _id в поле owner.' });
    return;
  }
  if (err instanceof mongoose.Error.CastError && err.path === '_id') {
    res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Неверный _id объекта.' });
    return;
  }
  if (err instanceof NullQueryResultError) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send({ message: 'Объект не найден.' });
    return;
  }
  if (err instanceof CredentialsError) {
    res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Неправильные почта или пароль.' });
    return;
  }
  if (err instanceof AuthenticationRequiredError) {
    res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
    return;
  }
  if (err instanceof ForbiddenError) {
    res
      .status(constants.HTTP_STATUS_FORBIDDEN)
      .send({ message: 'Недостаточно прав на изменение объекта.' });
    return;
  }
  if (err instanceof UrlNotFoundError) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send({ message: 'По указанному url ничего нет.' });
    return;
  }
  res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: 'Произошла ошибка на сервере.' });

  next();
}

module.exports = errorHandler;
