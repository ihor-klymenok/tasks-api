import * as joi from 'joi'

export const taskValidationSchema = joi.object({
  userId: joi.string().required(),
  title: joi.string().required(),
  dueDate: joi.date(),
  priority: joi.only(['LOW', 'NORMAL', 'HIGH']),
})

export const validateTask = <T> (data: T) => taskValidationSchema.validate(data)
