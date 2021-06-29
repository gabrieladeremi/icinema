import Joi from "joi";
export const signUpValidate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(21).required(),
    username: Joi.string().required(),
  });
  return Schema.validate(data);
};

export const signInValidate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(21).required(),
  });
  return Schema.validate(data);
};
