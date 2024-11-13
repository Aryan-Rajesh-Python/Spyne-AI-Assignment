const Joi = require('joi');

const likeDiscussionSchema = Joi.object({
    postId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    action: Joi.string().valid('like', 'dislike').required()
})

const viewCountDiscussionSchema = Joi.object({
    postId: Joi.string().guid({ version: ['uuidv4'] }).required(),
})

const followUser = Joi.object({
    userId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    action: Joi.string().valid('follow', 'unfollow').required()
})

const comment = Joi.object({
    postId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    commentId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    action: Joi.string().valid('post', 'comment').required(),
    text: Joi.string().min(3).max(512).required(),
})

const validatelikeDiscussionSchema = (data) => {
    const { error, value } = likeDiscussionSchema.validate(data);
    return { error, value };
};
const validateviewCountDiscussionSchema = (data) => {
    const { error, value } = viewCountDiscussionSchema.validate(data);
    return { error, value };
};
const validatefollowUserSchema = (data) => {
    const { error, value } = followUser.validate(data);
    return { error, value };
};
const validateCommentSchema = (data) => {
    const { error, value } = comment.validate(data);
    return { error, value };
};

module.exports = {
    validatelikeDiscussionSchema, validateviewCountDiscussionSchema,
    validatefollowUserSchema, validateCommentSchema
}