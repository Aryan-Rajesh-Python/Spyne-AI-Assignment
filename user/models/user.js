const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        default: uuidv4()
    },
    password: {
        type: String,
        required: true
    },
    followers: [{ type: String }],
    following: [{ type: String }]
});

module.exports = mongoose.model("users", userSchema);
