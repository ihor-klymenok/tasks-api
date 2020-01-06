import * as joi from 'joi'

export const userValidationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
})

export const validateUser = <T> (data: T) => userValidationSchema.validate(data)
