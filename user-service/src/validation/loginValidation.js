const Joi = require('joi');

// Login doğrulama şeması
const loginValidationSchema = Joi.object({
  login: Joi.string()
    .required()
    .messages({
      "string.empty": "Username or email is required",
    }),
  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
});

module.exports = { loginValidationSchema };
