import Joi from 'joi'


export const genreValidation = data =>
{
    const Schema = Joi.object({
        name: Joi.string().min(4).required()
    })
    return Schema.validate(data)
}

