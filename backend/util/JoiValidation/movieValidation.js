import Joi from "joi";

export const createMovieValidate = (data) => {
  const Schema = Joi.object({
    title: Joi.string(),
    description: Joi.string().min(4),
    genre: Joi.string()
  });
  return Schema.validate(data);
};
