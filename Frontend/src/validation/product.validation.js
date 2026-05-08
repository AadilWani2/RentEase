import Joi from "joi";

export const productValidation =
  Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),

    description: Joi.string()
      .min(10)
      .required(),

    category: Joi.string()
      .required(),

    monthlyRent: Joi.number()
      .min(1)
      .required(),

    securityDeposit:
      Joi.number()
        .min(0)
        .required(),

    stock: Joi.number()
      .min(0)
      .required(),
  });