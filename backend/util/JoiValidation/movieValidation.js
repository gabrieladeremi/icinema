import Joi from "joi";

export const createMovieValidate = (data) => {
  const Schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(4).required(),
    genre: Joi.string()
  });
  return Schema.validate(data);
};
