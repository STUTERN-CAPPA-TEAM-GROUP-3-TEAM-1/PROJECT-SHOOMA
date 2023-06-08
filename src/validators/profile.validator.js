import Joi from 'joi'

export const profileValidator  = Joi.object({
    username: Joi.string().required(),
  phonenumber: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
 
  }).strict