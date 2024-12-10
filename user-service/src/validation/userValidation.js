const Joi = require("joi");

const userValidationSchema = Joi.object({
  nameSurname: Joi.string()
    .pattern(/^[A-Za-z]+ [A-Za-z]+$/) // Sadece iki kelime, harflerden oluşmalı
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must be less than 3 characters long",
      "string.pattern.base":
        "Name and surname must consist of two words separated by a space, containing only letters",
    }),
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/) // Sadece harfler ve rakamlar, boşluk ve özel karakter yok
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.pattern.base":
        "Username must not contain spaces or special characters",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must be less than 30 characters long",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/) // En az bir büyük, bir küçük harf ve bir sayı
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
});

module.exports = { userValidationSchema };
