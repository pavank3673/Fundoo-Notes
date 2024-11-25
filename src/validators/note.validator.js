import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string(),
    UserId: Joi.number()
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

export const updateNoteValidator = (req, res, next) => {
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

  const reqBodySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string(),
    UserId: Joi.number()
  });

  const reqParamsSchema = Joi.object({
    id: Joi.number()
  });

  const reqParamsValidation = reqParamsSchema.validate(req.params);
  const reqHeadersValidation = reqHeadersSchema.validate(req.headers);
  const reqBodyValidation = reqBodySchema.validate(req.body);

  if (
    reqParamsValidation.error ||
    reqHeadersValidation.error ||
    reqBodyValidation.error
  ) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: reqParamsValidation.error
        ? reqParamsValidation.error.message
        : reqHeadersValidation.error
        ? reqHeadersValidation.error.message
        : reqBodyValidation.error.message
    });
  } else {
    next();
  }
};

export const getAllNotesValidator = (req, res, next) => {
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
  const { error, value } = reqHeadersSchema.validate(req.headers);
  if (error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: `${error}`
    });
  } else {
    next();
  }
};

export const noteByIdValidator = (req, res, next) => {
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

  const reqParamsSchema = Joi.object({
    id: Joi.number()
  });
  const reqHeadersValidation = reqHeadersSchema.validate(req.headers);
  const reqParamsValidation = reqParamsSchema.validate(req.params);
  if (reqParamsValidation.error || reqHeadersValidation.error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: reqParamsValidation.error
        ? reqParamsValidation.error.message
        : reqHeadersValidation.error.message
    });
  } else {
    next();
  }
};
