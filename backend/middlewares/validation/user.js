const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../../constants');

// Schemas
const signinSchema = Joi.object().keys({
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  password: Joi.string().required().pattern(regExp.password),
});

const signupSchema = Joi.object().keys({
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  password: Joi.string().required().pattern(regExp.password),
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().uri().pattern(regExp.url),
});

const userInfoSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().required().min(2).max(30),
});

const avatarSchema = Joi.object().keys({
  avatar: Joi.string().required().uri().pattern(regExp.url),
});

const userIdUrlParamsSchema = Joi.object().keys({
  userId: Joi.string().required().pattern(regExp.mongoObjectId),
});

// func fo url params validation
function userIdUrlParamsValidation(req, res, next) {
  celebrate(
    {
      params: userIdUrlParamsSchema,
    },
    { abortEarly: false },
  )(req, res, next);
}

// factory func for body validation
function createValidationMiddleware(schema) {
  return (req, res, next) => {
    celebrate(
      {
        body: schema,
      },
      { abortEarly: false },
    )(req, res, next);
  };
}

// Validation maddlewares
module.exports = {
  signinValidation: createValidationMiddleware(signinSchema),
  signupValidation: createValidationMiddleware(signupSchema),
  userInfoValidation: createValidationMiddleware(userInfoSchema),
  avatarValidation: createValidationMiddleware(avatarSchema),
  userIdUrlParamsValidation,
};
