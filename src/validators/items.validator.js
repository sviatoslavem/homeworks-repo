import Joi from "joi";

export const createItemSchema = Joi.object({
  text: Joi.string().min(1).required().messages({
    "string.empty": "Поле 'text' не може бути порожнім",
    "any.required": "Поле 'text' є обов’язковим",
  }),
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid("new", "done").required().messages({
    "any.only": "Статус повинен бути 'new' або 'done'",
    "any.required": "Поле 'status' є обов’язковим",
  }),
});

export const idParamSchema = Joi.object({
  itemId: Joi.number().integer().positive().required().messages({
    "number.base": "ID має бути числом",
    "number.integer": "ID має бути цілим числом",
    "number.positive": "ID має бути додатнім числом",
    "any.required": "ID є обов’язковим",
  }),
});

export const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }

    next();
  };
