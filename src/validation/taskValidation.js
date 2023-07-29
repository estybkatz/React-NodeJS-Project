import Joi from "joi";

import validation from "./validation";
const taskSchema = Joi.object({
  task: Joi.string().min(2).max(256).required(),
  workerToDo: Joi.string().min(2).max(256).required(),
  dateOpened: Joi.string().min(2).max(1024).required(),
  lastDateToDo: Joi.string().min(2).max(256).required(),
  done: Joi.boolean(),
  customerID: Joi.string().hex().length(24),
});
const validateTaskSchema = (userInput) => validation(taskSchema, userInput);

export default validateTaskSchema;
