import Joi from 'joi'

export const createUserValidator = Joi.object({
  Id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  fullName: Joi.string().required()
}).strict()


