import Joi from "joi";

export const searchRestaurantsSchema = Joi.object({
  dinerIds: Joi.array()
    .items(Joi.number().integer().positive().messages({
      "number.base": "Each diner ID must be a valid number.",
      "number.integer": "Each diner ID must be an integer.",
      "number.positive": "Each diner ID must be a positive number.",
    }))
    .min(1)
    .required()
    .messages({
      "array.base": "Diner IDs must be an array.",
      "array.min": "At least one diner ID is required.",
      "any.required": "Diner IDs are required.",
    }),
  time: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "Time must be a valid date.",
      "date.format": "Time must be in ISO format.",
      "any.required": "Time is required.",
    }),
});

export const reserveTableSchema = Joi.object({
  tableId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Table ID must be a valid number.",
      "number.integer": "Table ID must be an integer.",
      "number.positive": "Table ID must be a positive number.",
      "any.required": "Table ID is required.",
    }),
  dinerIds: Joi.array()
    .items(Joi.number().integer().positive().messages({
      "number.base": "Each diner ID must be a valid number.",
      "number.integer": "Each diner ID must be an integer.",
      "number.positive": "Each diner ID must be a positive number.",
    }))
    .min(1)
    .required()
    .messages({
      "array.base": "Diner IDs must be an array.",
      "array.min": "At least one diner ID is required.",
      "any.required": "Diner IDs are required.",
    }),
  time: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "Time must be a valid date.",
      "date.format": "Time must be in ISO format.",
      "any.required": "Time is required.",
    }),
});
