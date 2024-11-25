import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const registerUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: `${error}`
    });
  } else {
    next();
  }
};

export const loginUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: `${error}`
    });
  } else {
    next();
  }
};

export const forgotPasswordUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: `${error}`
    });
  } else {
    next();
  }
};

export const resetPasswordUserValidator = (req, res, next) => {
  const reqBodyschema = Joi.object({
    password: Joi.string().required()
  });
  const reqHeadersSchema = Joi.object({
    authorization: Joi.string().required(),
    'content-type': Joi.string(),
    'user-agent': Joi.string(),
    accept: Joi.string(),
    'postman-token': Joi.string(),
    host: Joi.string(),
    'accept-encoding': Joi.string(),
    connection: Joi.string(),
    'content-length': Joi.string()
  });
  const reqBodyValidation = reqBodyschema.validate(req.body);
  const reqHeadersValidation = reqHeadersSchema.validate(req.headers);

  if (reqHeadersValidation.error || reqBodyValidation.error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: reqHeadersValidation.error
        ? reqHeadersValidation.error.message
        : reqBodyValidation.error.message
    });
  } else {
    next();
  }
};
