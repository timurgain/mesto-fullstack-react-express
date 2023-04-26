const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../../constants');

const cardInfoSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required()
    .uri()
    .pattern(regExp.url),
});

const cardIdUrlParamsSchema = Joi.object().keys({
  cardId: Joi.string().required().pattern(regExp.mongoObjectId),
});

function cardInfoValidation(req, res, next) {
  celebrate(
    {
      body: cardInfoSchema,
    },
    { abortEarly: false },
  )(req, res, next);
}

function cardIdUrlParamsValidation(req, res, next) {
  celebrate(
    {
      params: cardIdUrlParamsSchema,
    },
    { abortEarly: false },
  )(req, res, next);
}

module.exports = { cardInfoValidation, cardIdUrlParamsValidation };
