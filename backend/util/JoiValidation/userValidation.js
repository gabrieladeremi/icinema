import Joi from "joi";
export const signUpValidate = (data) => {
  const Schema = Joi.keys({
    email: Joi.String().email().required(),
    password: Joi.String().min(4).max(21).required(),
    username: Joi.String().required(),
  });
  return Schema.validate(data);
};

export const signInValidate = (data) => {
  const Schema = Joi.keys({
    email: Joi.String().email().required(),
    password: Joi.String().min(4).max(21).required(),
  });
  return Schema.validate(data);
};
