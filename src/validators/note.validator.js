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
  const reqBodyValidation = reqBodySchema.validate(req.body);

  if (
    reqParamsValidation.error ||
    reqBodyValidation.error
  ) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: reqParamsValidation.error
        ? reqParamsValidation.error.message
        : reqBodyValidation.error.message
    });
  } else {
    next();
  }
};

export const noteByIdValidator = (req, res, next) => {
  const reqParamsSchema = Joi.object({
    id: Joi.number()
  });
  const reqParamsValidation = reqParamsSchema.validate(req.params);
  if (reqParamsValidation.error) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: reqParamsValidation.error.message
    });
  } else {
    next();
  }
};
