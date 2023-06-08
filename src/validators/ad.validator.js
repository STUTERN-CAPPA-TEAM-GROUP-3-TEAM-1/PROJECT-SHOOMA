import Joi from "joi";

export const createAdValidator = Joi.object({
   description: Joi.string().required(),
}).strict()