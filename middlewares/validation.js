const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.uri");
};

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
      "any.required": 'The "name" field is required',
    }),

    weather: Joi.string().required().messages({
      "string.empty": 'The "weather" field must be filled in',
      "any.required": 'The "weather" field is required',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
      "any.required": 'The "imageUrl" field is required',
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
      "any.required": 'The "name" field is required',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
      "any.required": 'The "avatar" field is required',
    }),

    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
      "any.required": 'The "email" field is required',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": 'The "password" field is required',
    }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
      "any.required": 'The "email" field is required',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": 'The "password" field is required',
    }),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.hex": '"itemId" must only contain hexadecimal characters',
      "string.length": '"itemId" must be 24 characters long',
      "any.required": '"itemId" is required',
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required().messages({
      "string.hex": '"userId" must only contain hexadecimal characters',
      "string.length": '"userId" must be 24 characters long',
      "any.required": '"userId" is required',
    }),
  }),
});

const validateProfileBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
      "any.required": 'The "name" field is required',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
      "any.required": 'The "avatar" field is required',
    }),
  }),
});

module.exports = {
  validateCardBody,
  validateUserBody,
  validateAuthentication,
  validateItemId,
  validateUserId,
  validateProfileBody,
};
