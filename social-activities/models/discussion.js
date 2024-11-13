const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const replySchema = mongoose.Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ userId: { type: String } }],
    replies: [this]
});

const commentSchema = mongoose.Schema({
    authorId: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ userId: { type: String } }],
    replies: [replySchema]
});

const discussionSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        default: uuidv4()
    },
    hashtags: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likes: [{
        userId: { type: String, unique: true }
    }],
    comments: [commentSchema],
    viewCount: [{
        userId: { type: String, unique: true }
    }]
});

module.exports = mongoose.model("Discussion", discussionSchema);
