const Joi = require('joi');

const discussion_schema = Joi.object({
    text: Joi.string().min(3).max(512).required(),
    imageURL: Joi.string().uri(),
    postId: Joi.string().guid({ version: ['uuidv4'] }),
    hashtags: Joi.array().items(
        Joi.string()
    )
});

const validateDiscussionSchema = (data) => {
    const { error, value } = discussion_schema.validate(data);
    return { error, value };
};


module.exports = { validateDiscussionSchema };